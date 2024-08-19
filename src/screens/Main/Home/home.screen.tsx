import React, { FC, useCallback, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, RefreshControl } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "theme";
import { ScreenEnum } from "enums";
import { useAppTheme } from "hooks";
import { NavigatorParamList } from "navigators";
import { ListWithPagination } from "interfaces";
import { Text, ChatCard, Divider, EmptyListText, LoadingIndicator } from "components";
import {
  ListRoomItemI,
  NotificationI,
  useAppDispatch,
  ListRoomResponseI,
  getListRoomsService,
  listNotificationService,
  ListNotificationResponseI,
} from "store";

import createStyles from "./home.styles";

const LIMIT: number = 10;

const HomeScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.HOME>> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState<number>(0);
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

  const onRefresh = useCallback(
    async (page: number = 1) => {
      setRefreshing(true);
      setState((prev) => ({
        ...prev,
        page: 1,
        hasNext: false,
      }));

      try {
        const response: ListRoomResponseI = await dispatch(getListRoomsService({ page, limit: LIMIT })).unwrap();
        if (response?.result?.docs) {
          setState((prev) => ({
            ...prev,
            list: response.result.docs,
            page: 2,
            hasNext: response.result.hasNextPage,
            listRefreshing: false,
          }));
        }
      } catch (err) {
        console.log("Error while getting chatroom's list: ", err);
      } finally {
        setRefreshing(false);
      }
    },
    [dispatch]
  );

  const getNotificationList = useCallback(async () => {
    try {
      const response: ListNotificationResponseI = await dispatch(listNotificationService()).unwrap();
      const filteredItems = response?.result?.docs.filter((item: NotificationI) => !item.isRead);
      setUnreadNotificationCount(filteredItems.length);
    } catch (error) {
      console.log("Error while fetching notifications: ", error);
    }
  }, [dispatch]);

  const getChatRooms = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      listRefreshing: true,
    }));

    try {
      const response: ListRoomResponseI = await dispatch(
        getListRoomsService({ page: state.page, limit: LIMIT })
      ).unwrap();

      if (response?.result?.docs) {
        setState((prev) => ({
          ...prev,
          list: prev.list.concat(response?.result?.docs),
          page: prev.page + 1,
          hasNext: response?.result?.hasNextPage,
          listRefreshing: false,
        }));
      }
    } catch (err) {
      console.log("Error while getting chatroom's list: ", err);
    }
  }, [state.page, dispatch]);

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

          {unreadNotificationCount > 0 && (
            <View style={styles.unreadMessageContainer}>
              <Text text={unreadNotificationCount.toString()} style={styles.unreadMessageText} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.mainBodyContainer}>
          <FlatList
            data={state.list}
            keyExtractor={(item: ListRoomItemI, index: number) => item?._id || index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: { item: ListRoomItemI }) => (
              <ChatCard
                item={item}
                onPress={() =>
                  navigation.navigate(ScreenEnum.USER_MESSAGING, {
                    roomId: item._id,
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
    </View>
  );
};

export { HomeScreen };
