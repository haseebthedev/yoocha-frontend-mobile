import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { useAppTheme } from "hooks";
import { NavigatorParamList } from "navigators";
import { contactScreenOptions } from "constant";
import { AlertBox, AppHeading, ContactUserCard, EmptyListText, PopupMenu, Text, UserSuggestionCard } from "components";
import {
  FriendI,
  RootState,
  getExplorePeopleService,
  getFriendsSuggestionService,
  sendFriendRequest,
  useAppDispatch,
  useAppSelector,
} from "store";
import createStyles from "./contact.styles";

const EXPLORE_PEOPLE_LIMIT: number = 10;
const FRIEND_SUGG_LIMIT: number = 4;

const ContactScreen: FC<NativeStackScreenProps<NavigatorParamList, "contacts">> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const {
    friendSuggestionsLoading: fLoading,
    explorePeopleLoading: eLoading,
    friendSuggestions,
    explorePeople,
  } = useAppSelector((state: RootState) => state.contacts);

  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onAddFriendBtnPress = async (id: string) => {
    await dispatch(sendFriendRequest({ inviteeId: id }))
      .unwrap()
      .catch((err) => console.error("error: ", err));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch(getExplorePeopleService({ page: 1, limit: EXPLORE_PEOPLE_LIMIT }));
      await dispatch(getFriendsSuggestionService({ page: 1, limit: FRIEND_SUGG_LIMIT }));
    } catch (err) {
      console.error("error: ", err);
    } finally {
      setRefreshing(false);
    }
  };

  const getFriendsSuggestions = async () => {
    await dispatch(getFriendsSuggestionService({ page: 1, limit: FRIEND_SUGG_LIMIT }))
      .unwrap()
      .catch((err) => console.log("err: ", err));
  };

  const getExplorePeople = async () => {
    await dispatch(getExplorePeopleService({ page: 1, limit: EXPLORE_PEOPLE_LIMIT }))
      .unwrap()
      .catch((err) => console.log("err: ", err));
  };

  useEffect(() => {
    // if (isFocused) {
    getExplorePeople();
    getFriendsSuggestions();
    // }
  }, []);

  const ListHeader = () => {
    return (
      <>
        <AppHeading title="People may know" />
        <View style={styles.suggestionsContainer}>
          {/* {fLoading ? (
            <ActivityIndicator />
          ) : ( */}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
            data={friendSuggestions?.docs || []}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }: { item: FriendI }) => (
              <View key={item._id}>
                <UserSuggestionCard
                  item={item}
                  onViewPress={() => navigation.navigate("publicProfile", { item })}
                  btnTitle={item?.isFriendReqSent ? "Pending" : "Add Friend"}
                  onAddFriendBtnPress={() => onAddFriendBtnPress(item._id)}
                />
              </View>
            )}
            ListEmptyComponent={() =>
              !refreshing &&
              !fLoading &&
              friendSuggestions?.docs.length === 0 && (
                <EmptyListText text="There are no friends suggestion!" textStyle={styles.emptyTextPlaceholder} />
              )
            }
          />
          {/* )} */}
        </View>

        <AppHeading title="Explore" rightTitle="View All" onRightPress={() => navigation.navigate("searchPeople")} />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.appHeader}>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" color={theme.colors.iconColor} size={24} />
        </TouchableOpacity>
        <Text text="YOOCHAT" preset="logo" style={styles.heading} />
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="ellipsis-vertical-sharp" color={theme.colors.iconColor} size={20} />
        </TouchableOpacity>

        <PopupMenu isVisible={menuVisible} setMenuVisible={setMenuVisible} menuOptions={contactScreenOptions} />
      </View>

      <View style={styles.exploreContainer}>
        {/* {eLoading ? (
          <View>
            <ActivityIndicator />
          </View>
        ) : ( */}
        <FlatList
          data={explorePeople?.docs || []}
          keyExtractor={(item: FriendI, index: number) => item?._id || index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ListHeader}
          renderItem={({ item }: { item: FriendI }) => (
            <ContactUserCard
              item={item}
              btnTitle={item?.isFriendReqSent ? "Pending" : "Add"}
              onBtnPress={() => onAddFriendBtnPress(item._id)}
              onViewPress={() => navigation.navigate("publicProfile", { item })}
            />
          )}
          ListEmptyComponent={() =>
            !refreshing &&
            explorePeople.docs.length === 0 &&
            !eLoading && <EmptyListText text="No People to Explore!" textStyle={styles.emptyTextPlaceholder} />
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
        {/* )} */}
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
