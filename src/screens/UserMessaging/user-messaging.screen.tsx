import { FC, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "theme";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ListWithPagination, MenuOptionI } from "interfaces";
import { AlertBox, EmptyListText, MessageCard, PopupMenu, Text } from "components";
import {
  FriendI,
  ListMessageResponseI,
  MessageItemI,
  RootState,
  SendMessageResponseI,
  UserI,
  blockUserService,
  getListMessageService,
  sendMessageService,
  useAppDispatch,
  useAppSelector,
} from "store";
import { EventEnum } from "enums";
import { socket } from "socket/socketIo";
import { userMessageScreenOptions } from "constant";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import Ionicons from "react-native-vector-icons/Ionicons";
import createStyles from "./styles";
import { useAppTheme } from "hooks";

const LIMIT: number = 50;

const UserMessagingScreen: FC<NativeStackScreenProps<NavigatorParamList, "usermessaging">> = ({
  navigation,
  route,
}) => {
  const { roomId, friendName, item } = route.params;

  const dispatch = useAppDispatch();

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const flatListRef = useRef<FlatList>(null);
  const messageInputRef = useRef<TextInput>(null);

  const { user } = useAppSelector((state: RootState) => state.auth);
  const [otherUser, setOtherUser] = useState<UserI>();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuOption, setMenuOption] = useState<MenuOptionI>({
    id: 0,
    title: "",
  });

  const [blockModalVisible, setBlockModalVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isUserBlock, setIsUserBlock] = useState<boolean>(false);
  const [state, setState] = useState<ListWithPagination<MessageItemI>>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  const blockUser = async () => {
    await dispatch(blockUserService({ id: otherUser?._id }))
      .unwrap()
      .then(() => {
        setIsUserBlock(true);
        setBlockModalVisible((prev) => !prev);
      })
      .catch((error) => console.log("error: ", error));
  };

  const sendMessage = async () => {
    await dispatch(sendMessageService({ roomId: roomId, message: message }));
    messageInputRef.current?.clear();
  };

  const renderLoader = () => {
    return (
      state.listRefreshing && (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      )
    );
  };

  const getMessages = async () => {
    setState((prev) => ({ ...prev, listRefreshing: true }));
    await dispatch(getListMessageService({ roomId: roomId, page: state.page, limit: LIMIT }))
      .unwrap()
      .then((response: ListMessageResponseI) => {
        if (response?.result?.docs) {
          setState((prev: ListWithPagination<MessageItemI>) => ({
            ...prev,
            list: prev.list.concat(response.result.docs),
            page: 1 + prev.page,
            hasNext: response.result.hasNextPage,
            listRefreshing: false,
          }));
        }
      });
  };

  const loadMoreItems = () => {
    if (!state.listRefreshing && state.hasNext) {
      getMessages();
    }
  };

  useEffect(() => {
    getMessages();

    return () => {
      setState({ ...state, list: [], page: 1, hasNext: false });
    };
  }, []);

  useEffect(() => {
    if (menuOption.title === "Block user") {
      setBlockModalVisible(true);
    }
  }, [menuOption]);

  useEffect(() => {
    const otherUser = item?.initiator._id === user?._id ? item.invitee : item.initiator;
    setOtherUser(otherUser);
  }, []);

  const scrollToTop = () => {
    if (flatListRef?.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on(EventEnum.RECIEVE_MESSAGE, (payload: any) => {
        setState((prev: any) => ({
          ...prev,
          list: [payload._doc, ...prev.list],
        }));
      });
    }
  }, [socket]);

  useEffect(() => {
    console.log("other user === ", otherUser);
  }, [otherUser]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.appHeader}>
          <View style={styles.flexAlignCenter}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" color={theme.colors.iconColor} size={24} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5} style={{ flexDirection: "row" }} onPress={() => {}}>
              <Image
                source={otherUser?.profilePicture ? { uri: otherUser?.profilePicture } : personPlaceholder}
                style={styles.profileImage}
              />
              <View>
                <Text text={friendName} preset="semiBold" style={styles.name} />
                <Text text={`Last seen: 4:20pm`} style={styles.lastSeenText} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="ellipsis-vertical-sharp" color={theme.colors.iconColor} size={24} />
        </TouchableOpacity>

        <PopupMenu
          isVisible={menuVisible}
          setMenuVisible={setMenuVisible}
          menuOptions={userMessageScreenOptions}
          setMenuOption={setMenuOption}
        />
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.listHeight}>
          <FlatList
            inverted={true}
            ref={flatListRef}
            style={{ flex: 1 }}
            data={state.list}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: MessageItemI) => String(item._id)}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => <MessageCard item={item} />}
            ItemSeparatorComponent={() => <View style={styles.paddingVertical} />}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderLoader}
            ListEmptyComponent={() =>
              !state.listRefreshing &&
              state.list.length === 0 && (
                <View style={{ transform: [{ scaleY: -1 }] }}>
                  <EmptyListText
                    text="There are no messages yet. Start a conversation!"
                    textStyle={styles.emptyTextPlaceholder}
                  />
                </View>
              )
            }
            onLayout={scrollToTop} // Scrolls to bottom when layout changes (initial render)
          />
        </View>

        {isUserBlock ? (
          <EmptyListText text="User has been blocked!" textStyle={styles.emptyTextPlaceholder} />
        ) : (
          <View style={styles.inputFieldBlock}>
            <TextInput
              ref={messageInputRef}
              value={message}
              placeholder="Type here..."
              onChangeText={(text) => setMessage(text)}
              placeholderTextColor={colors.textDim}
              style={styles.inputfield}
            />
            <TouchableOpacity onPress={sendMessage}>
              <Ionicons name="send" color={colors.primary} size={20} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <AlertBox
        open={blockModalVisible}
        title="Block!"
        description="Are you sure you want to block."
        onClose={() => setBlockModalVisible((prev) => !prev)}
        secondaryButtonText="Cancel"
        primaryButtonText="Block"
        secondaryOnClick={() => setBlockModalVisible((prev) => !prev)}
        primaryOnClick={blockUser}
      />
    </View>
  );
};

export { UserMessagingScreen };
