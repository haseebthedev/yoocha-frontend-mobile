import { FC, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { hp } from "utils/responsive";
import { socket } from "socket";
import { NavigatorParamList } from "navigators";
import { SendFriendReqPayloadI } from "interfaces";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EventEnum, EventEnumRole } from "enums";
import { AddUserSuggestionCard, Header, SearchBar, Text } from "components";
import {
  GetFriendsSuggestionResponseI,
  RootState,
  UserI,
  getFriendsSuggestionService,
  useAppDispatch,
  useAppSelector,
} from "store";
import styles from "./suggestion.styles";

const SuggestionsScreen: FC<NativeStackScreenProps<NavigatorParamList, "suggestions">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [suggestedFriends, setSuggestedFriends] = useState<UserI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onViewPress = (item) => navigation.navigate("publicProfile", { item });

  const onAddFriendBtnPress = async (id: string) => {
    const payload: SendFriendReqPayloadI = {
      participants: [
        { user: user?._id ?? "", role: EventEnumRole.INITIATOR },
        { user: id, role: EventEnumRole.INVITEE },
      ],
    };
    if (socket) {
      socket.emit(EventEnum.SEND_FRIEND_REQUEST, payload);
    }
  };

  const getFriendsSuggestions = async () => {
    setIsLoading(true);
    await dispatch(getFriendsSuggestionService())
      .unwrap()
      .then((response: GetFriendsSuggestionResponseI) => {
        if (response?.result?.doc) {
          setSuggestedFriends(response?.result?.doc);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getFriendsSuggestions();
  }, []);

  return (
    <View style={styles.container}>
      <Header headerText="Suggestions" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

      <View style={{ flex: 1 }}>
        <SearchBar />

        <FlatList
          data={suggestedFriends}
          keyExtractor={(item: UserI, index: number) => item?._id || index.toString()}
          style={{ marginTop: hp(2) }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <AddUserSuggestionCard
              item={item}
              onViewPress={() => onViewPress(item)}
              onAddFriendBtnPress={() => onAddFriendBtnPress(item._id)}
            />
          )}
          ListEmptyComponent={() =>
            !isLoading &&
            suggestedFriends.length === 0 && (
              <View style={styles.emptyTextContainer}>
                <Text preset="heading">There are no messages yet. Start a conversation!</Text>
              </View>
            )
          }
        />
      </View>
    </View>
  );
};

export { SuggestionsScreen };
