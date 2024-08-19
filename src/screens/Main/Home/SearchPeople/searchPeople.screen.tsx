import { FC, useCallback, useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "theme";
import { ScreenEnum } from "enums";
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

const SearchPeopleScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.SEARCH_PEOPLE>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const { loading, searchExplorePeople } = useAppSelector((state: RootState) => state.contacts);

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [personId, setPersonId] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [searchItems, setSearchItems] = useState<boolean>(false);
  const [loadMoreItems, setLoadMoreItems] = useState<boolean>(false);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);

  const getSearchPeople = async (name: string = "", page: number = 1) => {
    await dispatch(getSearchExploreService({ name, page, limit: LIMIT }))
      .unwrap()
      .catch((err) => console.log("error: ", err))
      .finally(() => setSearchItems(false));
  };

  const onSearchSubmit = async (searchText: string) => {
    setSearchItems(true);
    setSearchText(searchText);

    if (searchText.trim()) {
      await getSearchPeople(searchText);
    }
  };

  const onViewPress = (item: UserI) => navigation.navigate(ScreenEnum.PUBLIC_PROFILE, { item });

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

  const loadMoreItemsItems = useCallback(async () => {
    if (searchExplorePeople?.hasNextPage && !loading) {
      setLoadMoreItems(true);
      await dispatch(getSearchExploreService({ page: searchExplorePeople?.page + 1, limit: LIMIT }))
        .unwrap()
        .catch((error) => console.log("Error loading more items:", error))
        .finally(() => setLoadMoreItems((prev: boolean) => !prev));
    }
  }, [searchExplorePeople, loading, dispatch]);

  const renderLoader = () => {
    return loadMoreItems && <LoadingIndicator color={colors.primary} containerStyle={styles.loaderStyle} />;
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
        {!loading && searchText && searchExplorePeople?.docs?.length === 0 && (
          <EmptyListText text="No people found!" textStyle={styles.emptyTextPlaceholder} />
        )}

        {searchItems ? (
          <LoadingIndicator />
        ) : searchExplorePeople?.docs?.length > 0 && searchText ? (
          <FlatList
            data={searchExplorePeople?.docs}
            keyExtractor={(item: UserI, index: number) => item?._id || index.toString()}
            contentContainerStyle={styles.listContainerStyle}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: UserI }) => (
              <ContactUserCard
                item={item}
                btnTitle={item?.isFriendReqSent ? "Pending" : "Add"}
                onBtnPress={() => onBtnPress(item._id, item.isFriendReqSent)}
                onViewPress={() => onViewPress(item)}
              />
            )}
            onEndReached={loadMoreItemsItems}
            ListFooterComponent={renderLoader}
            onEndReachedThreshold={0.5}
          />
        ) : (
          !loading &&
          !searchText && <EmptyListText text="Search People to Connect!" textStyle={styles.emptyTextPlaceholder} />
        )}
      </View>

      <AlertBox
        open={alertModalVisible}
        title="Cancel Request"
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
