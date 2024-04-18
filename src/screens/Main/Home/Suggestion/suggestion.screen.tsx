import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ListWithPagination } from "interfaces";
import { ContactUserCard, EmptyListText, Header, SearchBar } from "components";
import {
  GetFriendsSuggestionResponseI,
  UserI,
  getFriendsSuggestionService,
  sendFriendRequest,
  useAppDispatch,
} from "store";
import styles from "./suggestion.styles";

const LIMIT: number = 10;

const SuggestionsScreen: FC<NativeStackScreenProps<NavigatorParamList, "suggestions">> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [suggestedFriends, setSuggestedFriends] = useState<ListWithPagination<UserI>>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });
  const onViewPress = (item: UserI) => navigation.navigate("publicProfile", { item });

  const onAddBtnPress = async (id: string) => {
    await dispatch(sendFriendRequest({ inviteeId: id }))
      .unwrap()
      .then((response) => {
        if (response?.result?.status) {
          const updatedList = suggestedFriends.list.filter((user) => user._id !== id);
          setSuggestedFriends((prevState) => ({
            ...prevState,
            list: updatedList,
          }));
        }
      })
      .catch((error) => console.log("Error sending friend request:", error));
  };

  const onRefresh = async () => {
    if (suggestedFriends.listRefreshing || refreshing) {
      return;
    }

    setRefreshing(true);

    setSuggestedFriends((prev: ListWithPagination<UserI>) => ({
      ...prev,
      page: 1,
      hasNext: false,
    }));

    await dispatch(getFriendsSuggestionService({ page: 1, limit: LIMIT }))
      .unwrap()
      .then((response: GetFriendsSuggestionResponseI) => {
        if (response?.result?.docs) {
          setSuggestedFriends((prev: ListWithPagination<UserI>) => ({
            ...prev,
            list: response?.result?.docs,
            page: 1 + prev?.page,
            hasNext: response?.result?.hasNextPage,
            listRefreshing: false,
          }));
        }
      })
      .then(() => setRefreshing(false));
  };

  const getFriendsSuggestions = async () => {
    setSuggestedFriends((prev: ListWithPagination<UserI>) => ({
      ...prev,
      listRefreshing: true,
    }));
    await dispatch(getFriendsSuggestionService({ page: suggestedFriends.page, limit: LIMIT }))
      .unwrap()
      .then((response: GetFriendsSuggestionResponseI) => {
        if (response?.result?.docs) {
          setSuggestedFriends((prev: ListWithPagination<UserI>) => ({
            ...prev,
            list: prev.list.concat(response?.result?.docs),
            page: 1 + prev?.page,
            hasNext: response?.result?.hasNextPage,
            listRefreshing: false,
          }));
        }
      });
  };

  useEffect(() => {
    getFriendsSuggestions();

    return () => {
      setSuggestedFriends({ ...suggestedFriends, list: [], page: 1, hasNext: false });
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header headerText="Suggestions" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

      <View style={styles.subContainer}>
        <SearchBar />

        {suggestedFriends.listRefreshing ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={suggestedFriends.list}
            keyExtractor={(item: UserI, index: number) => item?._id || index.toString()}
            contentContainerStyle={styles.listContainerStyle}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: UserI }) => (
              <ContactUserCard
                item={item}
                btnTitle={"Add"}
                onAddBtnPress={() => onAddBtnPress(item._id)}
                onViewPress={() => onViewPress(item)}
              />
            )}
            ListEmptyComponent={() =>
              !suggestedFriends.listRefreshing &&
              !refreshing &&
              suggestedFriends.list.length === 0 && <EmptyListText text="You don't have any friends suggestion!" />
            }
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        )}
      </View>
    </View>
  );
};

export { SuggestionsScreen };
