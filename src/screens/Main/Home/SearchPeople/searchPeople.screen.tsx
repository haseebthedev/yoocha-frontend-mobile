import { FC, useCallback, useState } from "react";
import { FlatList, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "theme";
import { useAppTheme } from "hooks";
import { NavigatorParamList } from "navigators";
import { AlertBox, ContactUserCard, EmptyListText, Header, LoadingIndicator, SearchBar } from "components";
import {
  RootState,
  UserI,
  getSearchExploreService,
  removeFriendRequest,
  sendFriendRequest,
  useAppDispatch,
  useAppSelector,
} from "store";
import createStyles from "./searchPeople.styles";

const LIMIT: number = 11;

const SearchPeopleScreen: FC<NativeStackScreenProps<NavigatorParamList, "searchPeople">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { loading, searchExplorePeople } = useAppSelector((state: RootState) => state.contacts);

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [personId, setPersonId] = useState<string>("");

  const onSearchSubmit = async (searchText: string) => {
    if (searchText) {
      await getSearchPeople(searchText);
    }
  };

  const onViewPress = (item: UserI) => navigation.navigate("publicProfile", { item });

  const onBtnPress = async (id: string, isFriendReqSent: boolean = false) => {
    if (isFriendReqSent) {
      setAlertModalVisible((prev: boolean) => !prev);
      setPersonId(id);
    } else {
      await dispatch(sendFriendRequest({ inviteeId: id }))
        .unwrap()
        .catch((err) => console.error("error: ", err));
    }
  };

  const cancelFriendRequest = async () => {
    await dispatch(removeFriendRequest({ inviteeId: personId }))
      .unwrap()
      .catch((err) => console.error("error: ", err))
      .finally(() => setAlertModalVisible((prev: boolean) => !prev));
  };

  const loadMoreItems = useCallback(async () => {
    if (searchExplorePeople?.hasNextPage && !loading) {
      setLoadMore(true);
      await dispatch(getSearchExploreService({ page: searchExplorePeople?.page + 1, limit: LIMIT }))
        .unwrap()
        .catch((error) => console.log("Error loading more items:", error))
        .finally(() => setLoadMore((prev: boolean) => !prev));
    }
  }, [searchExplorePeople, loading, dispatch]);

  const getSearchPeople = async (name: string = "", page: number = 1) => {
    await dispatch(getSearchExploreService({ name, page, limit: LIMIT }))
      .unwrap()
      .catch((err) => console.log("error: ", err));
  };

  const renderLoader = () => {
    return loadMore && <LoadingIndicator color={colors.primary} containerStyle={styles.loaderStyle} />;
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
            onSearchSubmit={onSearchSubmit}
          />
        </View>

        {loading && <LoadingIndicator />}

        {searchExplorePeople?.docs ? (
          <FlatList
            data={searchExplorePeople?.docs}
            keyExtractor={(item: UserI, index: number) => item?._id || index.toString()}
            contentContainerStyle={styles.listContainerStyle}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: UserI }) => (
              <ContactUserCard
                item={item}
                btnTitle={item?.isFriendReqSent ? "Pending" : "Add"}
                onBtnPress={onBtnPress}
                onViewPress={() => onViewPress(item)}
              />
            )}
            onEndReached={loadMoreItems}
            ListFooterComponent={renderLoader}
            // onEndReachedThreshold={0.5}
            ListEmptyComponent={() =>
              searchExplorePeople?.docs?.length === 0 && (
                <EmptyListText text="Search People to Connect!" textStyle={styles.emptyTextPlaceholder} />
              )
            }
          />
        ) : (
          <EmptyListText text="Search People to Connect!" textStyle={styles.emptyTextPlaceholder} />
        )}
      </View>

      <AlertBox
        open={alertModalVisible}
        title="Cancel Request!"
        description="Are you sure you want to cancel request?"
        onClose={() => setAlertModalVisible((prev) => !prev)}
        secondaryButtonText="Cancel"
        primaryButtonText="Remove"
        secondaryOnClick={() => setAlertModalVisible((prev) => !prev)}
        primaryOnClick={cancelFriendRequest}
      />
    </View>
  );
};

export { SearchPeopleScreen };
