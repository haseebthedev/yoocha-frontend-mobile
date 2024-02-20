import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { socket } from "socket";
import { NavigatorParamList } from "navigators";
import { SendFriendReqPayloadI } from "interfaces";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EventEnum, EventEnumRole } from "enums";
import { ContactUserCard, EmptyListText, Header, SearchBar, Text } from "components";
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

  const onViewPress = (item: UserI) => navigation.navigate("publicProfile", { item });

  const onAddBtnPress = async (id: string) => {
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

      <View style={styles.subContainer}>
        <SearchBar />

        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={suggestedFriends}
            keyExtractor={(item: UserI, index: number) => item?._id || index.toString()}
            contentContainerStyle={styles.listContainerStyle}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ContactUserCard
                item={item}
                btnTitle="Add"
                onAddBtnPress={() => onAddBtnPress(item._id)}
                onViewPress={() => onViewPress(item)}
              />
            )}
            ListEmptyComponent={() =>
              !isLoading &&
              suggestedFriends.length === 0 && <EmptyListText text="You don't have any friends in suggestion!" />
            }
          />
        )}
      </View>
    </View>
  );
};

export { SuggestionsScreen };
