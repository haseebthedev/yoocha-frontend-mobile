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
  FriendI,
  GetFriendsSuggestionResponseI,
  RootState,
  UserI,
  getExplorePeopleService,
  getFriendsSuggestionService,
  sendFriendRequest,
  useAppDispatch,
  useAppSelector,
} from "store";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./contact.styles";

const EXPLORE_PEOPLE_LIMIT: number = 10;
const FRIEND_SUGG_LIMIT: number = 4;

const ContactScreen: FC<NativeStackScreenProps<NavigatorParamList, "contacts">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { loading, friendSuggestions, explorePeople } = useAppSelector((state: RootState) => state.contacts);
  const { darkMode } = useAppSelector((state: RootState) => state.mode);

  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [peopleToExplore, setPeopleToExplore] = useState<FriendI[]>([]);
  const [suggestedFriend, setSuggestedFriend] = useState<FriendI[]>([]);

  const onAddFriendBtnPress = async (id: string) => {
    await dispatch(sendFriendRequest({ inviteeId: id }))
      .unwrap()
      .then((response) => {
        setPeopleToExplore((prev) =>
          prev.map((person) => (person._id === id ? { ...person, isFriendReqSent: true } : person))
        );
        setSuggestedFriend((prev) =>
          prev.map((person) => (person._id === id ? { ...person, isFriendReqSent: true } : person))
        );
      })
      .catch((err) => console.log("error: ", err));
  };

  const onRefresh = async () => {
    if (refreshing) {
      return;
    }
    setRefreshing(true);
    await dispatch(getExplorePeopleService({ page: 1, limit: FRIEND_SUGG_LIMIT }));
    await dispatch(getFriendsSuggestionService({ page: 1, limit: EXPLORE_PEOPLE_LIMIT }))
      .unwrap()
      .then((response: GetFriendsSuggestionResponseI) => {})
      .finally(() => setRefreshing(false));
  };

  const getFriendsSuggestions = async () => {
    await dispatch(getFriendsSuggestionService({ page: friendSuggestions.page, limit: FRIEND_SUGG_LIMIT }))
      .unwrap()
      .then(() => setSuggestedFriend(friendSuggestions));
  };

  const getExplorePeople = async () => {
    await dispatch(getExplorePeopleService({ page: explorePeople.page, limit: EXPLORE_PEOPLE_LIMIT }))
      .unwrap()
      .then(() => setPeopleToExplore(explorePeople));
  };

  useEffect(() => {
    getFriendsSuggestions();
  }, []);

  useEffect(() => {
    getExplorePeople();
  }, []);

  const ListHeader = () => {
    return (
      <>
        <AppHeading title="People may know" />
        {friendSuggestions.docs.length === 0 && !refreshing && !loading ? (
          <EmptyListText text="No Suggestions!" />
        ) : (
          <View style={styles.suggestionsContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
              data={friendSuggestions.docs}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => (
                <View key={item._id}>
                  <UserSuggestionCard
                    item={item}
                    onViewPress={() => navigation.navigate("publicProfile", { item })}
                    onAddFriendBtnPress={() => onAddFriendBtnPress(item._id)}
                  />
                </View>
              )}
            />
          </View>
        )}

        <AppHeading title="Explore" rightTitle="View All" onRightPress={() => navigation.navigate("searchPeople")} />
      </>
    );
  };

  return (
    <View style={[styles.container, darkMode ? styles.blackBg : styles.whiteBg]}>
      <View style={styles.appHeader}>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" color={darkMode ? colors.lightShade : colors.textDark} size={24} />
        </TouchableOpacity>
        <Text text="YOOCHAT" preset="logo" style={{ color: darkMode ? colors.white : colors.black }} />
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="ellipsis-vertical-sharp" color={darkMode ? colors.lightShade : colors.textDark} size={20} />
        </TouchableOpacity>

        <PopupMenu isVisible={menuVisible} setMenuVisible={setMenuVisible} menuOptions={contactScreenOptions} />
      </View>

      <View style={styles.exploreContainer}>
        <FlatList
          data={explorePeople.docs}
          keyExtractor={(item: FriendI, index: number) => item?._id || index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ListHeader}
          renderItem={({ item }) => (
            <ContactUserCard
              item={item}
              btnTitle={"Add"}
              onAddBtnPress={() => onAddFriendBtnPress(item._id)}
              onViewPress={() => navigation.navigate("publicProfile", { item })}
            />
          )}
          ListEmptyComponent={() =>
            !explorePeople.listRefreshing &&
            !refreshing &&
            explorePeople.list.length === 0 && <EmptyListText text="No People to Explore!" />
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
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
