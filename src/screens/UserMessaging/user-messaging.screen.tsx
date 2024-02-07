import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "theme";
import { MessageCard, Text } from "components";
import { NavigatorParamList } from "navigators";
import { GetMessageListResponseI, RootState, getListMessageService, useAppDispatch, useAppSelector } from "store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const UserMessagingScreen: FC<NativeStackScreenProps<NavigatorParamList, "usermessaging">> = ({
  navigation,
  route,
}) => {
  const { roomId } = route.params;
  const dispatch = useAppDispatch();

  const { chatMessages, loading: chatLoading } = useAppSelector((state: RootState) => state.chat);
  const [messageData, setMessageData] = useState<GetMessageListResponseI["result"]["docs"]>(chatMessages?.docs);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMesasge] = useState<string>("");

  const username = "Muhammad Ali";
  const lastSeen = "8:14 PM";

  const sendMessage = () => {
    console.log(message);
  };

  const renderLoader = () => {
    return isLoading && chatMessages?.hasNextPage ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItems = () => {
    if (chatMessages?.hasNextPage) {
      setCurrentPage(currentPage + 1);
      getMessages();
    }
  };

  const getMessages = async () => {
    setIsLoading(true);
    await dispatch(getListMessageService({ roomId: roomId, page: currentPage, limit: 15 }))
      .unwrap()
      .then((response) => {
        const uniqueMessages = response.result.docs.filter(
          (newMessage) => !messageData.some((oldMessage) => oldMessage._id === newMessage._id)
        );

        setMessageData((prevMessages) => [...prevMessages, ...uniqueMessages]);

        setIsLoading(false);
      });
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <View style={styles.container}>
      {/* App Header */}
      <View style={styles.appHeader}>
        <View style={styles.flexAlignCenter}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" color={colors.textDark} size={20} />
          </TouchableOpacity>
          <Image source={personPlaceholder} style={styles.profileImage} />
          <View>
            <Text text={username} preset="heading" />
            <Text text={`Last seen: ${lastSeen}`} style={styles.lastSeenText} />
          </View>
        </View>
      </View>

      {/* {chatLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.primary} size={30} />
        </View>
      ) : ( */}
      <View style={styles.bodyContainer}>
        <FlatList
          data={messageData}
          keyExtractor={(item) => String(item?._id)}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => <MessageCard item={item} />}
          ItemSeparatorComponent={() => <View style={styles.paddingVertical} />}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0}
          ListFooterComponent={renderLoader}
        />
      </View>
      {/* )} */}

      <View style={styles.inputFieldBlock}>
        <TextInput
          value={message}
          placeholder="Type here..."
          onChangeText={(text) => setMesasge(text)}
          placeholderTextColor={colors.textDim}
          style={styles.inputfield}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons name="send" color={colors.primary} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { UserMessagingScreen };
