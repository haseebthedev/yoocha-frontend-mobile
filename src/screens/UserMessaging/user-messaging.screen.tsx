import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "theme";
import { socket } from "socket/socketIo";
import { EventEnum } from "enums";
import { AlertBox, EmptyListText, Menu, MessageCard, Text } from "components";
import { NavigatorParamList } from "navigators";
import { ListMessageI, SendMessagePayloadI } from "interfaces";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ListMessageResponseI,
  MessageItemI,
  RootState,
  blockUserService,
  getListMessageService,
  useAppDispatch,
  useAppSelector,
} from "store";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { RefreshControl } from "react-native";
import { Keyboard } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { userMessageScreenOptions } from "constant";

const LIMIT: number = 15;

const UserMessagingScreen: FC<NativeStackScreenProps<NavigatorParamList, "usermessaging">> = ({
  navigation,
  route,
}) => {
  const { roomId, friendName } = route.params;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  // const [menuOption, setMenuOption] = useState<string>("");
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [state, setState] = useState<ListMessageI>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  const lastSeen = "8:14 PM";

  const onCloseAlertBoxPress = () => setAlertModalVisible((prev) => !prev);

  const blockUser = async () => {
    confirmBlockUser();
  };

  const confirmBlockUser = async () => {
    await dispatch(blockUserService({ roomId, userId: user?._id }));
    navigation.goBack();
  };

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
          list: prev.list.concat([payload._doc]),
        }));
      });
    }
  }, [socket]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
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
            <TouchableOpacity onPress={() => setAlertModalVisible((prev: boolean) => !prev)}>
              <Ionicons name="ellipsis-vertical-sharp" color={colors.textDark} size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.bodyContainer}>
            <View style={styles.listHeight}>
              <KeyboardAvoidingView behavior="position">
                <FlatList
                  data={state.list}
                  keyExtractor={(item: MessageItemI) => String(item?._id)}
                  contentContainerStyle={styles.listContainer}
                  renderItem={({ item }: { item: MessageItemI }) => <MessageCard item={item} />}
                  ItemSeparatorComponent={() => <View style={styles.paddingVertical} />}
                  onEndReached={loadMoreItems}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={renderLoader}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
                  }
                  ListEmptyComponent={() =>
                    !isLoading &&
                    state.list.length === 0 && <EmptyListText text="There are no messages yet. Start a conversation!" />
                  }
                />
              </KeyboardAvoidingView>
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
      </KeyboardAvoidingView>

      {/* <Menu isVisible={menuVisible} setMenuVisible={setMenuVisible} menuOptions={userMessageScreenOptions} /> */}
      <AlertBox
        open={alertModalVisible}
        title="Block!"
        description="Are you sure you want to block."
        onClose={onCloseAlertBoxPress}
        secondaryButtonText="Cancel"
        primaryButtonText="Block"
        secondaryOnClick={() => setAlertModalVisible((prev) => !prev)}
        primaryOnClick={blockUser}
      />
    </SafeAreaView>
  );
};

export { UserMessagingScreen };
