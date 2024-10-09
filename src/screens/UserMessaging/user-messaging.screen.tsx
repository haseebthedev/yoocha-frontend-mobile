import { FC, useEffect, useMemo, useRef, useState, useCallback } from "react";
import { FlatList, Image, TextInput, TouchableOpacity, View, ImageSourcePropType, Keyboard } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";

import { colors } from "theme";
import { socket } from "socket/socketIo";
import { useAppTheme } from "hooks";
import { createNewMessage } from "utils/message";
import { NavigatorParamList } from "navigators";
import { EventEnum, ScreenEnum } from "enums";
import { uploadImageToCloudinary } from "utils/cloudinary";
import { userMessageScreenOptions } from "constant";
import { ListWithPagination, MenuOptionI } from "interfaces";
import {
  AlertBox,
  EmptyListText,
  LoadingIndicator,
  MessageCard,
  PopupMenu,
  Text,
  ImagePickerModal,
  ActionButton,
} from "components";
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
  MessageType,
} from "store";
import personplaceholder from "assets/images/person.png";

import createStyles from "./styles";
import { capitalize } from "utils/formatString";

const LIMIT: number = 50;

const UserMessagingScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.USER_MESSAGING>> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const { roomId, item } = route.params;

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const { user } = useAppSelector((state: RootState) => state.auth);

  const flatListRef = useRef<FlatList>(null);
  const messageInputRef = useRef<TextInput>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints: string[] = useMemo(() => ["25%", "50%", "75%"], []);

  const [otherUser, setOtherUser] = useState<UserI>();
  const [menuOption, setMenuOption] = useState<MenuOptionI>({
    id: 0,
    title: "",
  });
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");
  const [isUserBlock, setIsUserBlock] = useState<boolean>(false);
  const [imageMessage, setImageMessage] = useState<ImageSourcePropType | null>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isMessageSending, setIsMessageSending] = useState<boolean>(false);
  const [blockModalVisible, setBlockModalVisible] = useState<boolean>(false);
  const [attachmentPickerVisible, setAttachmentPickerVisible] = useState<boolean>(false);
  const [state, setState] = useState<ListWithPagination<MessageItemI>>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  const friendName: string = `${capitalize(otherUser?.firstname || "Guest")} ${capitalize(otherUser?.lastname || "")}`;

  const friendProfileImage: ImageSourcePropType = otherUser?.profilePicture
    ? { uri: otherUser?.profilePicture }
    : personplaceholder;

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        onPress={() => setAttachmentPickerVisible((prev) => !prev)}
      />
    ),
    [setAttachmentPickerVisible]
  );

  const handleOpenImagePicker = () => {
    Keyboard.dismiss();
    setAttachmentPickerVisible((prev) => !prev);
  };

  const blockUser = async () => {
    await dispatch(blockUserService({ id: otherUser?._id }))
      .unwrap()
      .then(() => {
        setIsUserBlock(true);
        setBlockModalVisible((prev) => !prev);
      })
      .catch((error) => console.log("error: ", error));
  };

  const updateMessageList = (newMessage: MessageItemI) => {
    setState((prev: ListWithPagination<MessageItemI>) => ({
      ...prev,
      list: [newMessage, ...prev.list],
    }));
  };

  const handleTextMessage = async () => {
    const newMessage = createNewMessage(user, roomId, message, null, MessageType.TEXT);
    updateMessageList(newMessage);
    messageInputRef.current?.clear();

    try {
      await dispatch(sendMessageService({ roomId, message, type: MessageType.TEXT })).unwrap();
    } catch (error) {
      console.log("Error while sending text message: ", error);
    } finally {
      setMessage("");
      messageInputRef.current?.clear();
    }
  };

  const handleImageMessage = async () => {
    if (!selectedImage) return;

    const newMessage = createNewMessage(user, roomId, null, selectedImage.uri, MessageType.IMAGE);
    updateMessageList(newMessage);

    setImageMessage(null);

    try {
      const imageUri = await uploadImageToCloudinary(selectedImage);
      if (imageUri) {
        await dispatch(sendMessageService({ roomId, files: [imageUri], type: MessageType.IMAGE })).unwrap();
        setSelectedImage(null);
      }
    } catch (error) {
      console.log("Error while sending image message: ", error);
    } finally {
      setSelectedImage(null);
    }
  };

  const sendMessage = async () => {
    if (isMessageSending) return;

    setIsMessageSending(true);

    try {
      if (message) {
        await handleTextMessage();
      }

      if (selectedImage) {
        await handleImageMessage();
      }
    } finally {
      setIsMessageSending(false);
    }
  };

  const removeImage = async () => {
    setImageMessage(null);
    setSelectedImage(null);
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
            list: prev.list.concat(response?.result?.docs),
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
      console.log("OK");
      const handleReceiveMessage = (payload: any) => {
        setState((prev: ListWithPagination<MessageItemI>) => {
          const updatedMessages = prev.list.filter((msg: MessageItemI) => msg.chatRoomId === payload._doc.chatRoomId);
          return {
            ...prev,
            list: [payload._doc, ...updatedMessages],
          };
        });
      };

      socket.on(EventEnum.RECIEVE_MESSAGE, handleReceiveMessage);
    }
  }, [socket]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.appHeader}>
          <View style={styles.flexAlignCenter}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" color={theme.colors.iconColor} size={24} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.userData}
              onPress={() => {
                if (otherUser) {
                  navigation.navigate(ScreenEnum.PUBLIC_PROFILE, { item: otherUser });
                } else {
                  console.warn("User not found");
                }
              }}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={friendProfileImage}
                  style={otherUser?.profilePicture ? styles.profileImage : styles.imagePlaceholder}
                />
              </View>
              <View>
                <Text text={friendName} preset="semiBold" style={styles.name} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
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
                  <EmptyListText text="There are no messages yet." textStyle={styles.emptyTextPlaceholder} />
                  <EmptyListText text="Start a conversation!" textStyle={styles.emptyTextPlaceholder} />
                </View>
              )
            }
            onLayout={scrollToTop} // Scrolls to bottom when layout changes (initial render)
          />
        </View>

        {isUserBlock && <EmptyListText text="User has been blocked!" textStyle={styles.emptyTextPlaceholder} />}

        {!isUserBlock && (
          <View style={styles.inputFieldBlock}>
            {imageMessage ? (
              <View style={styles.inputImage}>
                <TouchableOpacity onPress={removeImage} style={styles.removeImageButton}>
                  <Ionicons name="close-circle-sharp" size={20} color={colors.red} />
                </TouchableOpacity>
                <Image source={imageMessage} style={styles.image} />
              </View>
            ) : (
              <TextInput
                ref={messageInputRef}
                value={message}
                placeholder="Type here..."
                onChangeText={setMessage}
                placeholderTextColor={colors.textDim}
                style={styles.inputfield}
              />
            )}

            <View style={styles.actionButtons}>
              <ActionButton
                icon="attach"
                onPress={handleOpenImagePicker}
                disabled={message || imageMessage ? true : false}
                color={theme.colors.iconColor}
                size={30}
              />

              <ActionButton
                icon="send"
                onPress={sendMessage}
                color={colors.primary}
                size={25}
                disabled={isMessageSending || (!message && !imageMessage)}
                // disabled={message || imageMessage ? false : true}
              />
            </View>
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

      <ImagePickerModal
        isVisible={attachmentPickerVisible}
        title="Select an Attachment!"
        setProfileImage={setImageMessage}
        setSelectedImage={setSelectedImage}
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        renderBackdrop={renderBackdrop}
        setAttachmentPickerVisible={setAttachmentPickerVisible}
      />
    </GestureHandlerRootView>
  );
};

export { UserMessagingScreen };
