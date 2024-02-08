import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "theme";
import { socket } from "socket/socketIo";
import { EventEnum } from "enums";
import { MessageCard, Text } from "components";
import { NavigatorParamList } from "navigators";
import { SendMessagePayloadI } from "interfaces";
import { ListChatI, MessageI } from "interfaces/chat";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GetMessageListResponseI, RootState, getListMessageService, useAppDispatch, useAppSelector } from "store";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const LIMIT: number = 15;

const UserMessagingScreen: FC<NativeStackScreenProps<NavigatorParamList, "usermessaging">> = ({
  navigation,
  route,
}) => {
  const { roomId, friendName } = route.params;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [state, setState] = useState<ListChatI>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  const lastSeen = "8:14 PM";

  const sendMessage = () => {
    if (message) {
      const payload: SendMessagePayloadI = {
        chatRoomId: roomId,
        message: message,
        sender: user?._id ?? null,
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
      .then((response: GetMessageListResponseI) => {
        if (response?.result?.docs) {
          setState((prev: ListChatI) => ({
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
        console.log("payload === ", payload);
        setState((prev: ListChatI) => ({
          ...prev,
          list: prev.list.concat([payload._doc]),
        }));
      });
    }
  }, [socket]);

  return (
    <View style={styles.container}>
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

      <View style={styles.bodyContainer}>
        <View style={styles.listHeight}>
          <FlatList
            // inverted
            data={state.list}
            keyExtractor={(item: MessageI) => String(item?._id)}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }: { item: MessageI }) => <MessageCard item={item} />}
            ItemSeparatorComponent={() => <View style={styles.paddingVertical} />}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderLoader}
            ListEmptyComponent={() =>
              !isLoading &&
              state.list.length === 0 && (
                <View style={styles.emptyTextContainer}>
                  <Text preset="heading">There are no messages yet. Start a conversation!</Text>
                </View>
              )
            }
          />
        </View>

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
      </View>
    </View>
  );
};

export { UserMessagingScreen };
