import { FC, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { colors } from "theme";
import { ListRoomsI } from "interfaces/chat";
import { UserStatusI } from "interfaces/user";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HOME_STATUS_DATA, HOME_SUGGESTION_DATA } from "constant";
import { useAppDispatch, getListRoomsService, ListRoomResponseI } from "store";
import { Text, HomeUserStatus, UserSuggestionCard, AppHeading, ChatCard, StatusModal, Divider } from "components";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./home.styles";

const HomeScreen: FC<NativeStackScreenProps<NavigatorParamList, "home">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [viewStatus, setViewStatus] = useState<boolean>(false);
  const [statusData, setStatusData] = useState<UserStatusI>({
    id: "",
    name: "",
    profilePic: "",
    date: "",
    statusImage: "",
  });

  const [state, setState] = useState<ListRoomsI>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  const onViewPress = (selectedItem: UserStatusI) => {
    setStatusData(selectedItem);
    setViewStatus((prev: boolean) => !prev);
  };

  const getChatRooms = async () => {
    setIsLoading(true);
    await dispatch(getListRoomsService())
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
            <FlatList
              horizontal
              data={HOME_SUGGESTION_DATA}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ gap: 8 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <UserSuggestionCard item={item} onViewPress={() => navigation.navigate("publicProfile", { item })} />
              )}
            />
          </View>

          <AppHeading title="Friends" />

          <FlatList
            data={state.list}
            keyExtractor={(item: any) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ChatCard item={item} onPress={() => navigation.navigate("usermessaging", { roomId: item?._id })} />
            )}
            style={styles.listChatroom}
            contentContainerStyle={styles.listChatroomContainer}
            ItemSeparatorComponent={() => <Divider />}
            onEndReached={loadMoreItems}
            onEndReachedThreshold={0.4}
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
