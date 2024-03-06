import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { socket } from "socket";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EventEnum, EventEnumRole } from "enums";
import { SendFriendReqPayloadI, SuggestedFriendI } from "interfaces";
import { ContactUserCard, EmptyListText, Header, SearchBar } from "components";
import {
  GetFriendsSuggestionResponseI,
  RootState,
  UserI,
  getFriendsSuggestionService,
  useAppDispatch,
  useAppSelector,
} from "store";
import styles from "./suggestion.styles";
import { showFlashMessage } from "utils/flashMessage";

const SuggestionsScreen: FC<NativeStackScreenProps<NavigatorParamList, "suggestions">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [suggestedFriends, setSuggestedFriends] = useState<SuggestedFriendI[]>([]);
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
      showFlashMessage({ type: "success", message: "Friend Request has been sent!" });

      const updatedSuggestedFriends = suggestedFriends.map((suggestedFriend) => {
        if (suggestedFriend.user._id === id) {
          return { ...suggestedFriend, reqSent: true };
        }
        return suggestedFriend;
      });

      setSuggestedFriends(updatedSuggestedFriends);
    }
  };

  const getFriendsSuggestions = async () => {
    setIsLoading(true);
    await dispatch(getFriendsSuggestionService())
      .unwrap()
      .then((response: GetFriendsSuggestionResponseI) => {
        if (response?.result?.users) {
          const suggestedUsers = response.result.users.map((user: UserI) => ({
            user,
            reqSent: false,
          }));

          setSuggestedFriends(suggestedUsers);
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
            keyExtractor={(item: SuggestedFriendI, index: number) => item?.user._id || index.toString()}
            contentContainerStyle={styles.listContainerStyle}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: SuggestedFriendI }) => (
              <ContactUserCard
                item={item.user}
                btnTitle={item.reqSent ? "Pending" : "Add"}
                onAddBtnPress={() => onAddBtnPress(item.user._id)}
                onViewPress={() => onViewPress(item.user)}
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
