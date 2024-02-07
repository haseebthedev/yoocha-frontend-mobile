import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "theme";
import { ListChatI } from "interfaces/chat";
import { MessageCard, Text } from "components";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GetMessageListResponseI, getListMessageService, useAppDispatch } from "store";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const LIMIT: number = 15;

const UserMessagingScreen: FC<NativeStackScreenProps<NavigatorParamList, "usermessaging">> = ({
  navigation,
  route,
}) => {
  const { roomId } = route.params;
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [state, setState] = useState<ListChatI>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  const username = "Muhammad Ali";
  const lastSeen = "8:14 PM";

  const sendMessage = () => {
    console.log(message);
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

  return (
    <View style={styles.container}>
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

      <View style={styles.bodyContainer}>
        <FlatList
          data={state.list}
          keyExtractor={(item) => String(item?._id)}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => <MessageCard item={item} />}
          ItemSeparatorComponent={() => <View style={styles.paddingVertical} />}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderLoader}
          ListEmptyComponent={() => (
            <View style={styles.emptyTextContainer}>
              <Text preset="heading">There are no messages yet. Start a conversation!</Text>
            </View>
          )}
        />

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
