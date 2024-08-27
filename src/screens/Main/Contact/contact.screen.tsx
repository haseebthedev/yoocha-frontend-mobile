import { FC, useEffect, useState } from "react";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { ScreenEnum } from "enums";
import { useAppTheme } from "hooks";
import { NavigatorParamList } from "navigators";
import { contactScreenOptions } from "constant";
import {
  AlertBox,
  AppHeading,
  ContactUserCard,
  EmptyListText,
  LoadingIndicator,
  PopupMenu,
  Text,
  UserSuggestionCard,
} from "components";
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

const ContactScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.CONTACTS>> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const { friendSuggestions, explorePeople } = useAppSelector((state: RootState) => state.contacts);

  const [friendId, setFriendId] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [loadExplorePeople, setLoadExplorePeople] = useState<boolean>(false);
  const [loadFriendSuggestion, setLoadFriendSuggestion] = useState<boolean>(false);

  const onAddFriendRequestHandler = async (inviteeId: string, isFriendReqSent: boolean = false) => {
    if (isFriendReqSent) {
      setAlertModalVisible((prev: boolean) => !prev);
      setFriendId(inviteeId);
    } else {
      try {
        await dispatch(sendFriendRequest({ inviteeId })).unwrap();
      } catch (err) {
        console.error("error: ", err);
      }
    }
  };

  const cancelFriendRequest = async () => {
    await dispatch(removeFriendRequest({ inviteeId: friendId }))
      .unwrap()
      .catch((err) => console.error("error: ", err))
      .finally(() => setAlertModalVisible((prev: boolean) => !prev));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getFriendsSuggestionService({ page: 1, limit: FRIEND_SUGG_LIMIT }))
      .unwrap()
      .catch((err) => console.log("err: ", err));

    await dispatch(getExplorePeopleService({ page: 1, limit: EXPLORE_PEOPLE_LIMIT }))
      .unwrap()
      .catch((err) => console.log("err: ", err));

    setRefreshing(false);
  };

  const getFriendsSuggestions = async () => {
    setLoadFriendSuggestion(true);
    await dispatch(getFriendsSuggestionService({ page: 1, limit: FRIEND_SUGG_LIMIT }))
      .unwrap()
      .catch((err) => console.log("err: ", err))
      .finally(() => setLoadFriendSuggestion(false));
  };

  const getExplorePeople = async () => {
    setLoadExplorePeople(true);

    await dispatch(getExplorePeopleService({ page: 1, limit: EXPLORE_PEOPLE_LIMIT }))
      .unwrap()
      .catch((err) => console.log("err: ", err))
      .finally(() => setLoadExplorePeople(false));
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
        <View style={styles.suggestionsContainer}>
          {loadFriendSuggestion ? (
            <LoadingIndicator containerStyle={styles.activityIndicatorContainer} />
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
                    onViewPress={() => navigation.navigate(ScreenEnum.PUBLIC_PROFILE, { item })}
                    btnTitle={item?.isFriendReqSent ? "Pending" : "Add Friend"}
                    onBtnPress={onAddFriendRequestHandler}
                  />
                </View>
              )}
              ListEmptyComponent={() =>
                !loadFriendSuggestion &&
                friendSuggestions?.docs?.length === 0 && (
                  <View style={styles.emptyText}>
                    <EmptyListText text="There are no friends suggestion!" textStyle={styles.emptyTextPlaceholder} />
                  </View>
                )
              }
            />
          )}
        </View>

        <AppHeading
          title="Explore"
          rightTitle="View All"
          onRightPress={() => navigation.navigate(ScreenEnum.SEARCH_PEOPLE)}
        />
      </>
    );
  };

  const renderFooter = () =>
    loadExplorePeople && <LoadingIndicator containerStyle={styles.activityIndicatorContainer} />;

  return (
    <View style={styles.container}>
      <View style={styles.appHeader}>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" color={theme.colors.iconColor} size={24} />
        </TouchableOpacity>
        <Text text="YOOCHAT" preset="logo" style={styles.heading} />
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.iconBlock}>
          <Ionicons name="ellipsis-vertical-sharp" color={theme.colors.iconColor} size={18} />
        </TouchableOpacity>

        <PopupMenu isVisible={menuVisible} setMenuVisible={setMenuVisible} menuOptions={contactScreenOptions} />
      </View>

      <View style={styles.exploreContainer}>
        <FlatList
          data={explorePeople?.docs || []}
          keyExtractor={(_, index: number) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ListHeader}
          renderItem={({ item }: { item: UserI }) => (
            <ContactUserCard
              item={item}
              btnTitle={item?.isFriendReqSent ? "Pending" : "Add"}
              onBtnPress={onAddFriendRequestHandler}
              onViewPress={() => navigation.navigate(ScreenEnum.PUBLIC_PROFILE, { item })}
            />
          )}
          ListEmptyComponent={() =>
            explorePeople?.docs?.length === 0 &&
            !loadExplorePeople && <EmptyListText text="No People to Explore!" textStyle={styles.emptyTextPlaceholder} />
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListFooterComponent={renderFooter}
        />
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

export { ContactScreen };
