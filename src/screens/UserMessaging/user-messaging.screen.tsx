import { FC, useEffect, useMemo, useRef, useState, useCallback } from "react";
import { FlatList, Image, TextInput, TouchableOpacity, View, ImageSourcePropType } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";

import { colors } from "theme";
import { socket } from "socket/socketIo";
import { useAppTheme } from "hooks";
import { NavigatorParamList } from "navigators";
import { EventEnum, ScreenEnum } from "enums";
import { uploadImageToCloudinary } from "utils/cloudinary";
import { userMessageScreenOptions } from "constant";
import { ListWithPagination, MenuOptionI } from "interfaces";
import { AlertBox, EmptyListText, LoadingIndicator, MessageCard, PopupMenu, Text, ImagePickerModal } from "components";
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
import { createNewMessage } from "utils/message";

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

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints: string[] = useMemo(() => ["25%", "50%", "75%"], []);

  const [otherUser, setOtherUser] = useState<UserI>();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuOption, setMenuOption] = useState<MenuOptionI>({
    id: 0,
    title: "",
  });

  const [blockModalVisible, setBlockModalVisible] = useState<boolean>(false);
  const [fileModalVisible, setFileModalVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [profileImage, setProfileImage] = useState<ImageSourcePropType | null>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const [isUserBlock, setIsUserBlock] = useState<boolean>(false);
  const [state, setState] = useState<ListWithPagination<MessageItemI>>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

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
    if (message) {
      let newMessage = createNewMessage(user, roomId, message, "message");
      setState((prev: ListWithPagination<MessageItemI>) => ({
        ...prev,
        list: [newMessage, ...prev.list],
      }));

      messageInputRef.current?.clear();
      await dispatch(sendMessageService({ roomId, message }))
        .unwrap()
        .then((response) => setMessage(""))
        .catch((error) => console.log("Error while sending message: ", error));
    }

    if (selectedImage) {
      let newMessage = createNewMessage(user, roomId, selectedImage?.uri, "camera");

      setState((prev: ListWithPagination<MessageItemI>) => ({
        ...prev,
        list: [newMessage, ...prev.list],
      }));

      // let imageUri = await uploadImageToCloudinary(selectedImage);

      setSelectedImage(null);
      setProfileImage(null);

      // await dispatch(sendMessageService({ roomId, message: imageUri }))
      //   .unwrap()
      //   .then((response) => setMessage(""))
      //   .catch((error) => console.log("Error while sending message: ", error));
    }
  };

  const removeImage = async () => setProfileImage(null);

  const renderLoader = () => {
    return state.listRefreshing && <LoadingIndicator color={colors.primary} containerStyle={styles.loaderStyle} />;
  };

  const getMessages = async () => {
    setState((prev) => ({ ...prev, listRefreshing: true }));
    await dispatch(getListMessageService({ roomId: roomId, page: state.page, limit: LIMIT }))
      .unwrap()
      .then((response: ListMessageResponseI) => {
        if (response?.result?.docs) {
          const updatedMessages = response.result.docs.map((msg: MessageItemI) => ({
            ...msg,
            itemType: msg.itemType || "message",
          }));

          setState((prev: ListWithPagination<MessageItemI>) => ({
            ...prev,
            // list: prev.list.concat(response.result.docs),
            list: prev.list.concat(updatedMessages),
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
      const handleReceiveMessage = (payload: any) => {
        setState((prev: ListWithPagination<MessageItemI>) => {
          const uniqueMessages = prev.list.filter((msg: MessageItemI) => msg._id !== payload._doc._id);
          return {
            ...prev,
            list: uniqueMessages,
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

            <TouchableOpacity activeOpacity={0.5} style={styles.userData} onPress={() => {}}>
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
            {profileImage ? (
              <View style={styles.inputImage}>
                <TouchableOpacity onPress={removeImage} style={styles.removeImageButton}>
                  <Ionicons name="close-circle-sharp" size={20} color={colors.red} />
                </TouchableOpacity>
                <Image source={profileImage} style={styles.image} />
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
              {!profileImage && (
                <TouchableOpacity onPress={() => setFileModalVisible((prev) => !prev)}>
                  <Ionicons name="attach" color={theme.colors.iconColor} size={25} />
                </TouchableOpacity>
              )}

              <TouchableOpacity disabled={message || profileImage ? false : true} onPress={sendMessage}>
                <Ionicons name="send" color={colors.primary} size={20} />
              </TouchableOpacity>
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
        isVisible={fileModalVisible}
        title="Select an Attachment!"
        setProfileImage={setProfileImage}
        setSelectedImage={setSelectedImage}
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        renderBackdrop={renderBackdrop}
      />

      {/* <AttachmentPicker
        open={fileModalVisible}
        onClose={() => setFileModalVisible((prev) => !prev)}
        setPicture={setPicture}
      /> */}
    </GestureHandlerRootView>
  );
};

export { UserMessagingScreen };
