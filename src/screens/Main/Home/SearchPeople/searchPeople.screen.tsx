import { FC, useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParamList } from "navigators";
import { colors } from "theme";
import { ContactUserCard, EmptyListText, Header, SearchBar } from "components";
import {
  ExplorePeopleResponseI,
  FriendI,
  RootState,
  UserI,
  getSearchExploreService,
  sendFriendRequest,
  useAppDispatch,
  useAppSelector,
} from "store";
import { useAppTheme } from "hooks";
import createStyles from "./searchPeople.styles";

const LIMIT: number = 11;

const SearchPeopleScreen: FC<NativeStackScreenProps<NavigatorParamList, "searchPeople">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { searchExplorePeopleLoading: eLoading, searchExplorePeople } = useAppSelector(
    (state: RootState) => state.contacts
  );

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onViewPress = (item: FriendI) => navigation.navigate("publicProfile", { item });

  const onAddBtnPress = async (id: string) => {
    await dispatch(sendFriendRequest({ inviteeId: id }))
      .unwrap()
      .catch((error) => console.log("Error: ", error));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getSearchExploreService({ page: 1, limit: LIMIT }))
      .unwrap()
      .finally(() => setRefreshing(false));
  };

  const loadMoreItems = useCallback(() => {
    if (searchExplorePeople?.hasNextPage && !eLoading) {
      dispatch(getSearchExploreService({ page: searchExplorePeople?.page + 1, limit: LIMIT }))
        .unwrap()
        .catch((error) => console.log("Error loading more items:", error));
    }
  }, [searchExplorePeople, eLoading, dispatch]);

  const getSearchPeople = async (page: number = 1) => {
    await dispatch(getSearchExploreService({ page, limit: LIMIT }))
      .unwrap()
      .catch((err) => console.log("error: ", err));
  };

  useEffect(() => {
    getSearchPeople();
  }, []);

  const renderLoader = () => {
    return (
      eLoading && (
        <View style={styles.loaderStyle}>
          <ActivityIndicator color={colors.primary} />
        </View>
      )
    );
  };

  return (
    <View style={styles.container}>
      <Header
        headerText="Search People"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
        titleStyle={{ color: theme.colors.heading }}
      />

      <View style={styles.subContainer}>
        <View style={styles.searchBarStyle}>
          <SearchBar
            containerStyle={styles.searchBar}
            inputStyle={styles.searchBarText}
            iconColor={theme.colors.heading}
            placeholderColor={theme.colors.placeholderColor}
          />
        </View>

        {eLoading ? (
          <View>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={searchExplorePeople?.docs || []}
            keyExtractor={(item: UserI, index: number) => item?._id || index.toString()}
            contentContainerStyle={styles.listContainerStyle}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: FriendI }) => (
              <ContactUserCard
                item={item}
                btnTitle={item?.isFriendReqSent ? "Pending" : "Add"}
                onBtnPress={() => onAddBtnPress(item._id)}
                onViewPress={() => onViewPress(item)}
              />
            )}
            onEndReached={loadMoreItems}
            ListFooterComponent={renderLoader}
            // onEndReachedThreshold={0.5}
            ListEmptyComponent={() =>
              !refreshing &&
              searchExplorePeople.result.docs.length === 0 && (
                <EmptyListText text="Search People to Connect!" textStyle={styles.emptyTextPlaceholder} />
              )
            }
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        )}
      </View>
    </View>
  );
};

export { SearchPeopleScreen };
