import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, View } from "react-native";

import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "theme";
import { ListWithPagination } from "interfaces";
import { ContactUserCard, EmptyListText, Header, SearchBar } from "components";
import { ExplorePeopleResponseI, UserI, getExplorePeopleService, sendFriendRequest, useAppDispatch } from "store";
import styles from "./searchPeople.styles";

const LIMIT: number = 15;

const SearchPeopleScreen: FC<NativeStackScreenProps<NavigatorParamList, "searchPeople">> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [explorePeople, setExplorePeople] = useState<ListWithPagination<UserI>>({
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
          const updatedList: UserI[] = explorePeople.list.filter((user) => user._id !== id);
          setExplorePeople((prevState) => ({
            ...prevState,
            list: updatedList,
          }));
        }
      })
      .catch((error) => console.log("Error sending friend request:", error));
  };

  const onRefresh = async () => {
    if (explorePeople.listRefreshing || refreshing) {
      return;
    }

    setRefreshing(true);

    setExplorePeople((prev: ListWithPagination<UserI>) => ({
      ...prev,
      page: 1,
      hasNext: false,
    }));

    await dispatch(getExplorePeopleService({ page: 1, limit: LIMIT }))
      .unwrap()
      .then((response: ExplorePeopleResponseI) => {
        if (response?.result?.docs) {
          setExplorePeople((prev: ListWithPagination<UserI>) => ({
            ...prev,
            list: response?.result?.docs,
            page: 2,
            hasNext: response?.result?.hasNextPage,
            listRefreshing: false,
          }));
        }
      })
      .finally(() => setRefreshing(false));
  };

  const loadMoreItems = () => {
    if (!explorePeople.listRefreshing && explorePeople.hasNext) {
      getExplorePeople();
    }
  };

  const renderLoader = () => {
    return (
      explorePeople.listRefreshing && (
        <View style={styles.loaderStyle}>
          <ActivityIndicator color={colors.primary} />
        </View>
      )
    );
  };

  const getExplorePeople = async () => {
    setExplorePeople((prev: ListWithPagination<UserI>) => ({
      ...prev,
      listRefreshing: true,
    }));

    await dispatch(getExplorePeopleService({ page: explorePeople.page, limit: LIMIT }))
      .unwrap()
      .then((response: ExplorePeopleResponseI) => {
        if (response?.result?.docs) {
          setExplorePeople((prev: ListWithPagination<UserI>) => ({
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
    getExplorePeople();

    return () => {
      setExplorePeople({ ...explorePeople, list: [], page: 1, hasNext: false });
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header headerText="Search People" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

      <View style={styles.subContainer}>
        <View style={styles.searchBarStyle}>
          <SearchBar />
        </View>

        <FlatList
          data={explorePeople.list}
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
          onEndReached={loadMoreItems}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={0.4}
          ListEmptyComponent={() =>
            !refreshing &&
            !explorePeople.listRefreshing &&
            explorePeople.list.length === 0 && <EmptyListText text="Search People to Connect!" />
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>
    </View>
  );
};

export { SearchPeopleScreen };
