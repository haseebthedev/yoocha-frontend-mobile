import { FC, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "theme";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ListWithPagination, MenuOptionI } from "interfaces";
import { AlertBox, EmptyListText, MessageCard, PopupMenu, Text } from "components";
import {
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
import styles from "./styles";

const LIMIT: number = 50;

const UserMessagingScreen: FC<NativeStackScreenProps<NavigatorParamList, "usermessaging">> = ({
  navigation,
  route,
}) => {
  const { roomId, friendName, item } = route.params;

  const dispatch = useAppDispatch();

  const flatListRef = useRef<FlatList>(null);
  const messageInputRef = useRef<TextInput>(null);

  const { user } = useAppSelector((state: RootState) => state.auth);
  const { darkMode } = useAppSelector((state: RootState) => state.mode);

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

  return (
    <View style={darkMode ? styles.darkContainer : styles.lightContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.appHeader}>
          <View style={styles.flexAlignCenter}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" color={darkMode ? colors.white : colors.textDark} size={24} />
            </TouchableOpacity>

            <Image
              source={otherUser?.profilePicture ? { uri: otherUser?.profilePicture } : personPlaceholder}
              style={styles.profileImage}
            />
            <View>
              <Text text={friendName} preset="semiBold" style={darkMode && { color: colors.white }} />
              <Text
                text={`Last seen: 4:20pm`}
                style={[styles.lastSeenText, { color: darkMode && colors.lightShade }]}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="ellipsis-vertical-sharp" color={darkMode ? colors.white : colors.textDark} size={24} />
        </TouchableOpacity>

        <PopupMenu
          isVisible={menuVisible}
          setMenuVisible={setMenuVisible}
          menuOptions={userMessageScreenOptions}
          setMenuOption={setMenuOption}
        />
      </View>

      <View style={darkMode ? styles.darkBodyContainer : styles.bodyContainer}>
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
                  <EmptyListText text="There are no messages yet. Start a conversation!" />
                </View>
              )
            }
            onLayout={scrollToTop} // Scrolls to bottom when layout changes (initial render)
          />
        </View>

        {isUserBlock ? (
          <EmptyListText text="User is Blocked!" />
        ) : (
          <View style={[styles.inputFieldBlock, { backgroundColor: darkMode ? colors.black : colors.white }]}>
            <TextInput
              ref={messageInputRef}
              value={message}
              placeholder="Type here..."
              onChangeText={(text) => setMessage(text)}
              placeholderTextColor={colors.textDim}
              style={[styles.inputfield, { color: darkMode ? colors.lightShade : colors.textDim }]}
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
