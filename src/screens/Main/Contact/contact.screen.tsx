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
  RootState,
  UserI,
  getExplorePeopleService,
  getFriendsSuggestionService,
  removeFriendRequest,
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

  const { loading, friendSuggestions, explorePeople } = useAppSelector((state: RootState) => state.contacts);

  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [personId, setPersonId] = useState<string>("");

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

  useEffect(() => {
    console.log(explorePeople);
    console.log(friendSuggestions);
  }, []);

  const ListHeader = () => {
    return (
      <>
        <AppHeading title="People may know" />
        <View style={styles.suggestionsContainer}>
          {refreshing ? (
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator />
            </View>
          ) : (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10 }}
              data={friendSuggestions?.docs || []}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }: { item: UserI }) => (
                <View key={item._id}>
                  <UserSuggestionCard
                    item={item}
                    onViewPress={() => navigation.navigate("publicProfile", { item })}
                    btnTitle={item?.isFriendReqSent ? "Pending" : "Add Friend"}
                    onBtnPress={onBtnPress}
                  />
                </View>
              )}
              ListEmptyComponent={() =>
                !refreshing &&
                !loading &&
                friendSuggestions?.docs?.length === 0 && (
                  <EmptyListText text="There are no friends suggestion!" textStyle={styles.emptyTextPlaceholder} />
                )
              }
            />
          )}
        </View>

        <AppHeading title="Explore" rightTitle="View All" onRightPress={() => navigation.navigate("searchPeople")} />
      </>
    );
  };

  const renderFooter = () =>
    refreshing && (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator />
      </View>
    );

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
        <FlatList
          data={refreshing ? [] : explorePeople?.docs || []}
          keyExtractor={(_, index: number) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ListHeader}
          renderItem={({ item }: { item: UserI }) => (
            <ContactUserCard
              item={item}
              btnTitle={item?.isFriendReqSent ? "Pending" : "Add"}
              onBtnPress={onBtnPress}
              onViewPress={() => navigation.navigate("publicProfile", { item })}
            />
          )}
          ListEmptyComponent={() =>
            explorePeople?.docs?.length === 0 &&
            !loading && <EmptyListText text="No People to Explore!" textStyle={styles.emptyTextPlaceholder} />
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListFooterComponent={renderFooter}
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
        primaryOnClick={cancelFriendRequest}
      />
    </View>
  );
};

export { ContactScreen };
