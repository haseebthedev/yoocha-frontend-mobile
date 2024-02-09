import { FC, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { colors } from "theme";
import { socket } from "socket/socketIo";
import { HOME_STATUS_DATA } from "constant";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EventEnum, EventEnumRole } from "enums";
import { ListRoomsI, SendFriendReqPayloadI, UserStatusI } from "interfaces";
import { Text, HomeUserStatus, UserSuggestionCard, AppHeading, ChatCard, StatusModal, Divider } from "components";
import {
  useAppDispatch,
  getListRoomsService,
  ListRoomResponseI,
  useAppSelector,
  RootState,
  getFriendsSuggestionService,
  GetFriendsSuggestionResponseI,
  UserI,
  ListRoomItemI,
} from "store";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./home.styles";

const LIMIT: number = 15;

const HomeScreen: FC<NativeStackScreenProps<NavigatorParamList, "home">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { loading } = useAppSelector((state: RootState) => state.chat);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [viewStatus, setViewStatus] = useState<boolean>(false);
  const [statusData, setStatusData] = useState<UserStatusI>({
    id: "",
    name: "",
    profilePic: "",
    date: "",
    statusImage: "",
  });
  const [suggestedFriends, setSuggestedFriends] = useState<UserI[]>([]);

  const [state, setState] = useState<ListRoomsI>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  const getFriendsSuggestions = async () => {
    await dispatch(getFriendsSuggestionService())
      .unwrap()
      .then((response: GetFriendsSuggestionResponseI) => {
        if (response?.result?.doc) {
          setSuggestedFriends(response?.result?.doc);
        }
      });
  };

  const onViewPress = (selectedItem: UserStatusI) => {
    setStatusData(selectedItem);
    setViewStatus((prev: boolean) => !prev);
  };

  const onAddFriendBtnPress = async (id: string) => {
    const payload: SendFriendReqPayloadI = {
      participants: [
        { user: user?._id ?? "", role: EventEnumRole.INITIATOR },
        { user: id, role: EventEnumRole.INVITEE },
      ],
    };
    if (socket) {
      socket.emit(EventEnum.SEND_FRIEND_REQUEST, payload);
    }
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    ) : null;
  };

  const getChatRooms = async () => {
    setIsLoading(true);
    await dispatch(getListRoomsService({ page: state.page, limit: LIMIT }))
      .unwrap()
      .then((response: ListRoomResponseI) => {
        if (response?.result?.docs) {
          setState((prev: ListRoomsI) => ({
            ...prev,
            list: prev.list.concat(response?.result?.docs),
            page: 1 + prev?.page,
            hasNext: response?.result?.hasNextPage,
          }));
        }
      })
      .finally(() => setIsLoading(false));
  };

  const loadMoreItems = () => {
    if (!isLoading && state.hasNext) {
      getChatRooms();
    }
  };

  useEffect(() => {
    getChatRooms();

    return () => {
      setState({ ...state, list: [], page: 1, hasNext: false });
    };
  }, []);

  useEffect(() => {
    getFriendsSuggestions();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.appHeader}>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" color={colors.textDark} size={24} />
        </TouchableOpacity>
        <Text text="YOOCHAT" preset="logo" />
        <TouchableOpacity onPress={() => navigation.navigate("notifications")}>
          <Ionicons name="notifications-outline" color={colors.textDark} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.sidebarContainer}>
          <FlatList
            data={HOME_STATUS_DATA}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            style={styles.sidebarList}
            contentContainerStyle={styles.sidebarListContentContainer}
            renderItem={({ item }) => (
              <HomeUserStatus key={item.id} item={item} onViewPress={() => onViewPress(item)} onAddPress={() => {}} />
            )}
          />
        </View>

        <View style={styles.mainBodyContainer}>
          <AppHeading
            title="Suggestions"
            rightTitle="View All"
            onRightPress={() => navigation.navigate("suggestions")}
          />

          <View>
            {loading ? (
              <View></View>
            ) : (
              <FlatList
                horizontal
                data={suggestedFriends}
                keyExtractor={(item: UserI, index: number) => item?._id || index.toString()}
                contentContainerStyle={{ gap: 8 }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }: { item: UserI }) => (
                  <UserSuggestionCard
                    item={item}
                    onViewPress={() => navigation.navigate("publicProfile", { item })}
                    onAddFriendBtnPress={() => onAddFriendBtnPress(item._id)}
                  />
                )}
              />
            )}
          </View>

          <AppHeading title="Friends" />

          <FlatList
            data={state.list}
            keyExtractor={(item: ListRoomItemI, index: number) => item?._id || index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: ListRoomItemI }) => (
              <ChatCard
                item={item}
                onPress={(fullName: string) =>
                  navigation.navigate("usermessaging", { roomId: item._id, friendName: fullName })
                }
              />
            )}
            style={styles.listChatroom}
            contentContainerStyle={styles.listChatroomContainer}
            onEndReached={loadMoreItems}
            ListFooterComponent={renderLoader}
            onEndReachedThreshold={0.4}
            ItemSeparatorComponent={() => <Divider />}
            ListEmptyComponent={() => isLoading && <ActivityIndicator />}
          />
        </View>
      </View>
      <StatusModal
        isVisible={viewStatus}
        selectedItem={statusData}
        title="Sara Khan"
        onPressClose={() => setViewStatus(false)}
      />
    </View>
  );
};

export { HomeScreen };
