import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { colors } from "theme";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ListWithPagination } from "interfaces";
import { contactScreenOptions } from "constant";
import { AlertBox, AppHeading, ContactUserCard, EmptyListText, PopupMenu, Text, UserSuggestionCard } from "components";
import {
  ExplorePeopleResponseI,
  GetFriendsSuggestionResponseI,
  UserI,
  getExplorePeopleService,
  getFriendsSuggestionService,
  sendFriendRequest,
  useAppDispatch,
} from "store";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./contact.styles";

const LIMIT: number = 10;

const ContactScreen: FC<NativeStackScreenProps<NavigatorParamList, "contacts">> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [explorePeople, setExplorePeople] = useState<ListWithPagination<UserI>>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });
  const [suggestedFriends, setSuggestedFriends] = useState<ListWithPagination<UserI>>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  const onAddFriendBtnPress = async (id: string, state: any, setState: Function) => {
    await dispatch(sendFriendRequest({ inviteeId: id }))
      .unwrap()
      .then((response) => {
        if (response?.result?.status) {
          const updatedList = state.list.filter((user) => user._id !== id);
          setState((prevState) => ({
            ...prevState,
            list: updatedList,
          }));
        }
      })
      .catch((error) => console.log("Error sending friend request:", error));
  };

  const onRefresh = async () => {
    if (explorePeople.listRefreshing || suggestedFriends.listRefreshing || refreshing) {
      return;
    }

    setRefreshing(true);
    setExplorePeople((prev: ListWithPagination<UserI>) => ({
      ...prev,
      page: 1,
      hasNext: false,
    }));

    setSuggestedFriends((prev: ListWithPagination<UserI>) => ({
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
      });

    await dispatch(getFriendsSuggestionService({ page: 1, limit: LIMIT }))
      .unwrap()
      .then((response: GetFriendsSuggestionResponseI) => {
        if (response?.result?.docs) {
          setSuggestedFriends((prev: ListWithPagination<UserI>) => ({
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

  const loadMoreItems = () => {
    if (!explorePeople.listRefreshing && explorePeople.hasNext) {
      getExplorePeople();
    }
  };

  const renderLoader = () => {
    return explorePeople.listRefreshing ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator color={colors.primary} />
      </View>
    ) : null;
  };

  useEffect(() => {
    getFriendsSuggestions();

    return () => {
      setSuggestedFriends({ ...suggestedFriends, list: [], page: 1, hasNext: false });
    };
  }, []);

  useEffect(() => {
    getExplorePeople();

    return () => {
      setExplorePeople({ ...explorePeople, list: [], page: 1, hasNext: false });
    };
  }, []);

  const ListHeader = () => {
    return (
      <>
        {suggestedFriends.list.length === 0 && !refreshing && !suggestedFriends.listRefreshing ? (
          <EmptyListText text="No Suggestions!" />
        ) : (
          <>
            <AppHeading
              title="People may know"
              rightTitle="View All"
              onRightPress={() => navigation.navigate("suggestions")}
            />
            {suggestedFriends.list.map((item) => {
              return (
                <View key={item._id}>
                  <UserSuggestionCard
                    item={item}
                    onViewPress={() => navigation.navigate("publicProfile", { item })}
                    onAddFriendBtnPress={() => onAddFriendBtnPress(item._id, suggestedFriends, setSuggestedFriends)}
                  />
                </View>
              );
            })}
          </>
        )}

        <AppHeading title="Explore" />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.appHeader}>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" color={colors.textDark} size={24} />
        </TouchableOpacity>
        <Text text="YOOCHAT" preset="logo" />
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="ellipsis-vertical-sharp" color={colors.textDark} size={20} />
        </TouchableOpacity>

        <PopupMenu isVisible={menuVisible} setMenuVisible={setMenuVisible} menuOptions={contactScreenOptions} />
      </View>

      <View style={styles.exploreContainer}>
        {explorePeople.listRefreshing ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          <FlatList
            data={explorePeople.list}
            keyExtractor={(item: UserI, index: number) => item?._id || index.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ListHeader}
            renderItem={({ item }) => (
              <ContactUserCard
                item={item}
                btnTitle={"Add"}
                onAddBtnPress={() => onAddFriendBtnPress(item._id, explorePeople, setExplorePeople)}
                onViewPress={() => navigation.navigate("publicProfile", { item })}
              />
            )}
            onEndReached={loadMoreItems}
            ListFooterComponent={renderLoader}
            onEndReachedThreshold={0.4}
            ListEmptyComponent={() =>
              !explorePeople.listRefreshing &&
              !refreshing &&
              explorePeople.list.length === 0 && <EmptyListText text="No People to Explore!" />
            }
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
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
      />
    </View>
  );
};

export { ContactScreen };
