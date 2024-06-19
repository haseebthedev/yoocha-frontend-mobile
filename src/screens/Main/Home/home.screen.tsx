import React, { FC, useCallback, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, RefreshControl, Image } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from "theme";
import { ScreenEnum } from "enums";
import { useAppTheme } from "hooks";
import { NotificationI } from "store/slice/notification/types";
import { NavigatorParamList } from "navigators";
import { listNotificationService } from "store/slice/notification/notificationService";
import { ListWithPagination, UserStatusI } from "interfaces";
import { Text, ChatCard, StatusModal, Divider, EmptyListText, LoadingIndicator } from "components";
import { useAppDispatch, getListRoomsService, ListRoomResponseI, ListRoomItemI, PaginationListResultI } from "store";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import createStyles from "./home.styles";

const LIMIT: number = 10;

const HomeScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.HOME>> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [unreadNotification, setUnreadNotification] = useState<number>(0);
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

  const listEmptyComponent = () =>
    !refreshing &&
    !state.listRefreshing &&
    state.list.length === 0 && (
      <View style={styles.emptyListContainer}>
        <EmptyListText text="No Friends Added yet!" textStyle={styles.emptyTextPlaceholder} />
      </View>
    );

  const renderLoader = useCallback(() => {
    return state.listRefreshing && <LoadingIndicator containerStyle={styles.loaderStyle} color={colors.primary} />;
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

  const getNotificationList = async () => {
    await dispatch(listNotificationService())
      .unwrap()
      .then((response: PaginationListResultI<NotificationI>) => {
        const filteredItems = response?.result?.docs.filter((item: NotificationI) => item.isRead != true);
        setUnreadNotification(filteredItems.length);
      })
      .catch((error) => console.log("error: ", error));
  };

  useEffect(() => {
    getChatRooms();
    return () => {
      setState({ ...state, list: [], page: 1, hasNext: false });
    };
  }, []);

  useEffect(() => {
    getNotificationList();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.appHeader]}>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" color={theme.colors.iconColor} size={24} />
        </TouchableOpacity>
        <Text text="YOOCHAT" preset="logo" style={styles.heading} />
        <TouchableOpacity onPress={() => navigation.navigate(ScreenEnum.NOTIFICATIONS)}>
          <Ionicons name="notifications-outline" color={theme.colors.iconColor} size={24} />

          {unreadNotification > 0 && (
            <View style={styles.unreadMessageContainer}>
              <Text text={unreadNotification.toString()} style={styles.unreadMessageText} />
            </View>
          )}
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
                  navigation.navigate(ScreenEnum.USER_MESSAGING, {
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
            ListEmptyComponent={listEmptyComponent}
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
