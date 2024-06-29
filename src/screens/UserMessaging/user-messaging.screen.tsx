import { FC, useEffect, useRef, useState } from "react";
import { FlatList, Image, ImageSourcePropType, TextInput, TouchableOpacity, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";

import { colors } from "theme";
import { socket } from "socket/socketIo";
import { useAppTheme } from "hooks";
import { NavigatorParamList } from "navigators";
import { EventEnum, ScreenEnum } from "enums";
import { userMessageScreenOptions } from "constant";
import { ListWithPagination, MenuOptionI } from "interfaces";
import { AlertBox, EmptyListText, FilePicker, LoadingIndicator, MessageCard, PopupMenu, Text } from "components";
import {
  UserI,
  ListMessageResponseI,
  MessageItemI,
  RootState,
  blockUserService,
  getListMessageService,
  sendMessageService,
  useAppDispatch,
  useAppSelector,
} from "store";
import personplaceholder from "assets/images/person.png";
import createStyles from "./styles";
import { hp, wp } from "utils/responsive";

const LIMIT: number = 50;

const UserMessagingScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.USER_MESSAGING>> = ({
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
  const [fileModalVisible, setFileModalVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [picture, setPicture] = useState<string>("");

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
    messageInputRef.current?.clear();
    await dispatch(sendMessageService({ roomId: roomId, message: message }));
  };

  const removeImage = async () => {
    setPicture("");
  };

  const renderLoader = () => {
    return state.listRefreshing && <LoadingIndicator color={colors.primary} containerStyle={styles.loaderStyle} />;
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.appHeader}>
          <View style={styles.flexAlignCenter}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" color={theme.colors.iconColor} size={24} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.5} style={{ flexDirection: "row" }} onPress={() => {}}>
              <View style={styles.imageContainer}>
                <Image
                  source={otherUser?.profilePicture ? { uri: otherUser?.profilePicture } : personplaceholder}
                  style={otherUser?.profilePicture ? styles.profileImage : styles.imagePlaceholder}
                />
              </View>
              <View>
                <Text text={friendName} preset="semiBold" style={styles.name} />
                <Text text={`Last seen: 4:20pm`} style={styles.lastSeenText} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setMenuVisible(true)}
          style={{ width: 24, height: 24, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons name="ellipsis-vertical-sharp" color={theme.colors.iconColor} size={18} />
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
            {picture ? (
              <View style={styles.inputImage}>
                <TouchableOpacity
                  onPress={removeImage}
                  style={{
                    position: "absolute",
                    bottom: hp(3.5),
                    left: wp(6.8),
                    zIndex: 100,
                    backgroundColor: "white",
                    borderRadius: hp(2),
                  }}
                >
                  <Ionicons name="close-circle-sharp" size={20} color={"red"} />
                </TouchableOpacity>
                <Image source={{ uri: picture }} style={styles.image} />
              </View>
            ) : (
              <>
                <TextInput
                  ref={messageInputRef}
                  value={message}
                  placeholder="Type here..."
                  onChangeText={(text) => setMessage(text)}
                  placeholderTextColor={colors.textDim}
                  style={styles.inputfield}
                />
                <TouchableOpacity onPress={() => setFileModalVisible((prev) => !prev)}>
                  <Ionicons name="attach" color={theme.colors.iconColor} size={25} />
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity onPress={sendMessage} style={{ paddingVertical: 10, paddingRight: 20 }}>
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

      <FilePicker
        open={fileModalVisible}
        onClose={() => setFileModalVisible((prev) => !prev)}
        setPicture={setPicture}
      />
    </View>
  );
};

export { UserMessagingScreen };
