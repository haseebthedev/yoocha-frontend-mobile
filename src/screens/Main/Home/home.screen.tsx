import React, { FC, useCallback, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, ActivityIndicator, RefreshControl } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from "theme";
import { useAppTheme } from "hooks";
import { NavigatorParamList } from "navigators";
import { ListWithPagination, UserStatusI } from "interfaces";
import { Text, ChatCard, StatusModal, Divider, EmptyListText } from "components";
import { useAppDispatch, getListRoomsService, ListRoomResponseI, ListRoomItemI } from "store";
import createStyles from "./home.styles";

const LIMIT: number = 10;

const HomeScreen: FC<NativeStackScreenProps<NavigatorParamList, "home">> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [viewStatus, setViewStatus] = useState<boolean>(false);
  const [statusData, setStatusData] = useState<UserStatusI>({
    id: "",
    name: "",
    profilePic: "",
    date: "",
    statusImage: "",
  });

  const [state, setState] = useState<ListWithPagination<ListRoomItemI>>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  // const onViewPress = useCallback((selectedItem: UserStatusI) => {
  //   setStatusData(selectedItem);
  //   setViewStatus((prev) => !prev);
  // }, []);

  const renderLoader = useCallback(() => {
    return (
      state.listRefreshing && (
        <View style={styles.loaderStyle}>
          <ActivityIndicator color={colors.primary} />
        </View>
      )
    );
  }, [state.listRefreshing]);

  const loadMoreItems = useCallback(() => {
    if (!state.listRefreshing && state.hasNext) {
      getChatRooms();
    }
  }, [state.listRefreshing, state.hasNext]);

  const getChatRooms = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      listRefreshing: true,
    }));
    await dispatch(getListRoomsService({ page: state.page, limit: LIMIT }))
      .unwrap()
      .then((response: ListRoomResponseI) => {
        if (response?.result?.docs) {
          setState((prev) => ({
            ...prev,
            list: prev.list.concat(response?.result?.docs),
            page: prev.page + 1,
            hasNext: response?.result?.hasNextPage,
            listRefreshing: false,
          }));
        }
      });
  }, [state.page, dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setState((prev) => ({
      ...prev,
      page: 1,
      hasNext: false,
    }));

    await dispatch(getListRoomsService({ page: 1, limit: LIMIT }))
      .unwrap()
      .then((response: ListRoomResponseI) => {
        if (response?.result?.docs) {
          setState((prev) => ({
            ...prev,
            list: response?.result?.docs,
            page: 2,
            hasNext: response?.result?.hasNextPage,
            listRefreshing: false,
          }));
        }
      })
      .finally(() => setRefreshing(false));
  }, [dispatch]);

  useEffect(() => {
    getChatRooms();

    return () => {
      setState({ ...state, list: [], page: 1, hasNext: false });
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.appHeader]}>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" color={theme.colors.iconColor} size={24} />
        </TouchableOpacity>
        <Text text="YOOCHAT" preset="logo" style={styles.heading} />
        <TouchableOpacity onPress={() => navigation.navigate("notifications")}>
          <Ionicons name="notifications-outline" color={theme.colors.iconColor} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        {/* <View style={styles.sidebarContainer}>
          <FlatList
            data={HOME_STATUS_DATA}
            keyExtractor={(item: HOME_STATUS_DATA_I) => item.id}
            showsVerticalScrollIndicator={false}
            style={styles.sidebarList}
            contentContainerStyle={styles.sidebarListContentContainer}
            renderItem={({ item }: { item: HOME_STATUS_DATA_I }) => (
              <HomeUserStatus key={item.id} item={item} onViewPress={() => onViewPress(item)} onAddPress={() => {}} />
            )}
          />
        </View> */}

        <View style={styles.mainBodyContainer}>
          <FlatList
            data={state.list}
            keyExtractor={(item: ListRoomItemI, index: number) => item?._id || index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: ListRoomItemI }) => (
              <ChatCard
                item={item}
                onPress={(fullName: string) =>
                  navigation.navigate("usermessaging", {
                    roomId: item._id,
                    friendName: fullName,
                    item: item,
                  })
                }
              />
            )}
            style={styles.listChatroom}
            contentContainerStyle={styles.listChatroomContainer}
            onEndReached={loadMoreItems}
            ListFooterComponent={renderLoader}
            onEndReachedThreshold={0.4}
            ItemSeparatorComponent={() => <Divider />}
            ListEmptyComponent={() =>
              !refreshing &&
              !state.listRefreshing &&
              state.list.length === 0 && (
                <EmptyListText text="You don't any friends yet!" textStyle={styles.emptyTextPlaceholder} />
              )
            }
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
