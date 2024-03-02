import { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  RefreshControl,
} from "react-native";
import { colors } from "theme";
import { socket } from "socket/socketIo";
import { EventEnum } from "enums";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ListMessageI, MenuOptionI, SendMessagePayloadI } from "interfaces";
import { AlertBox, EmptyListText, MessageCard, PopupMenu, Text } from "components";
import {
  ListMessageResponseI,
  MessageItemI,
  ParticipantI,
  RootState,
  blockUserService,
  getListMessageService,
  useAppDispatch,
  useAppSelector,
} from "store";
import { userMessageScreenOptions } from "constant";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const LIMIT: number = 15;

const UserMessagingScreen: FC<NativeStackScreenProps<NavigatorParamList, "usermessaging">> = ({
  navigation,
  route,
}) => {
  const { roomId, friendName, participants } = route.params;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [otherUser, setOtherUser] = useState<ParticipantI>();

  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuOption, setMenuOption] = useState<MenuOptionI>({
    id: 0,
    title: "",
  });

  const [blockModalVisible, setBlockModalVisible] = useState<boolean>(false);
  const [removeChatModalVisible, setRemoveChatModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isUserBlock, setIsUserBlock] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [state, setState] = useState<ListMessageI>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  const lastSeen = "8:14 PM";

  const blockUser = async () => {
    await dispatch(blockUserService({ roomId, userIdToBlock: otherUser?.user._id }))
      .unwrap()
      .then(() => {
        setIsUserBlock(true);
        setBlockModalVisible((prev) => !prev);
      });
  };

  const removeChat = async () => console.log("Remove Chat");

  const onRefresh = async () => {
    setRefreshing(true);

    await dispatch(getListMessageService({ roomId: roomId, page: 1, limit: LIMIT }))
      .unwrap()
      .then((response: ListMessageResponseI) => {
        if (response?.result?.docs) {
          setState((prev: ListMessageI) => ({
            ...prev,
            list: response.result.docs,
            page: 1 + prev.page,
            hasNext: response.result.hasNextPage,
          }));
        }
      })
      .finally(() => setRefreshing(false));
  };

  const sendMessage = () => {
    Keyboard.dismiss();
    if (message) {
      const payload: SendMessagePayloadI = {
        chatRoomId: roomId,
        message: message,
        sender: user?._id ?? "",
      };

      if (socket) {
        socket.emit(EventEnum.SEND_MESSAGE, payload);
      }

      setMessage("");
    }
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    ) : null;
  };

  const getMessages = async () => {
    setIsLoading(true);
    await dispatch(getListMessageService({ roomId: roomId, page: state.page, limit: LIMIT }))
      .unwrap()
      .then((response: ListMessageResponseI) => {
        if (response?.result?.docs) {
          setState((prev: ListMessageI) => ({
            ...prev,
            list: prev.list.concat(response.result.docs),
            page: 1 + prev.page,
            hasNext: response.result.hasNextPage,
          }));
        }
      })
      .finally(() => setIsLoading(false));
  };

  const loadMoreItems = () => {
    if (!isLoading && state.hasNext) {
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
    if (socket) {
      socket.on("receive_message", (payload: any) => {
        setState((prev: ListMessageI) => ({
          ...prev,
          list: prev.list.concat(payload._doc),
        }));
      });
    }
  }, [socket]);

  useEffect(() => {
    if (menuOption.title === "Block user") {
      setBlockModalVisible(true);
    } else if (menuOption.title === "Remove chat") {
      setRemoveChatModalVisible(true);
    }
  }, [menuOption]);

  useEffect(() => {
    const otherUser: ParticipantI[] = participants.filter((item) => item.user._id !== user?._id);
    setOtherUser(otherUser[0]);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.appHeader}>
          <View style={styles.flexAlignCenter}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" color={colors.textDark} size={20} />
            </TouchableOpacity>
            <Image source={personPlaceholder} style={styles.profileImage} />
            <View>
              <Text text={friendName} preset="heading" />
              <Text text={`Last seen: ${lastSeen}`} style={styles.lastSeenText} />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="ellipsis-vertical-sharp" color={colors.textDark} size={20} />
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
            data={state.list}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: MessageItemI) => String(item?._id)}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }: { item: MessageItemI }) => <MessageCard item={item} />}
            ItemSeparatorComponent={() => <View style={styles.paddingVertical} />}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderLoader}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
            ListEmptyComponent={() =>
              !isLoading &&
              state.list.length === 0 && <EmptyListText text="There are no messages yet. Start a conversation!" />
            }
          />
        </View>

        {isUserBlock ? (
          <EmptyListText text="User is Blocked!" />
        ) : (
          <View style={styles.inputFieldBlock}>
            <TextInput
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
        open={removeChatModalVisible}
        title="Remove Chat!"
        description="Are you sure you want to remove chat."
        onClose={() => setRemoveChatModalVisible((prev) => !prev)}
        secondaryButtonText="Cancel"
        primaryButtonText="Remove"
        secondaryOnClick={() => setRemoveChatModalVisible((prev) => !prev)}
        primaryOnClick={removeChat}
      />

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
