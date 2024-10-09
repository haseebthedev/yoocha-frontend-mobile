import { FC, useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "theme";
import { useAppTheme } from "hooks";
import { deleteNotificationService, useAppDispatch } from "store";
import { NavigatorParamList } from "navigators";
import { NotificationListResponseI } from "interfaces";
import { NotificationEnum, ScreenEnum } from "enums";
import { EmptyListText, Header, LoadingIndicator, NotificationCard } from "components";
import {
  NotificationResponseI,
  readNotificationService,
  listNotificationService,
  ListNotificationResponseI,
} from "store";
import createStyles from "./notification.styles";

const LIMIT: number = 10;

const NotificationScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.NOTIFICATIONS>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [state, setState] = useState<NotificationListResponseI>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  const navigateToScreenByNotificationType = (notificationType: NotificationEnum) => {
    switch (notificationType) {
      case NotificationEnum.FRIEND_REQUEST_RECIEVED:
        navigation.navigate(ScreenEnum.RECIEVED_REQUESTS);
        break;
      case NotificationEnum.FRIEND_REQUEST_ACCEPTED:
      case NotificationEnum.MESSAGE:
        navigation.navigate(ScreenEnum.HOME);
        break;
      default:
        navigation.navigate(ScreenEnum.NOTIFICATIONS);
    }
  };

  const onNotificationPress = async (id: string) => {
    try {
      const response: NotificationResponseI = await dispatch(readNotificationService({ id })).unwrap();

      if (response?.result) {
        const { type: notificationType } = response.result;

        if (notificationType) {
          navigateToScreenByNotificationType(notificationType);
        }

        setState((prev: NotificationListResponseI) => ({
          ...prev,
          list: prev.list.map((notification) =>
            notification._id === id ? { ...notification, isRead: true } : notification
          ),
        }));
      }
    } catch (error) {
      console.error("Error occurred while handling notification:", error);
    }
  };

  const onNotificationDismiss = useCallback(async (id: string) => {
    setState((prev: NotificationListResponseI) => ({
      ...prev,
      list: prev.list.filter((item) => item._id !== id),
    }));

    try {
      await dispatch(deleteNotificationService({ id })).unwrap();
    } catch (error) {
      console.log("Error while deleting notification: ", error);
    }
  }, []);

  const getNotificationList = useCallback(async () => {
    setState((prev: NotificationListResponseI) => ({
      ...prev,
      listRefreshing: true,
    }));

    try {
      const response: ListNotificationResponseI = await dispatch(
        listNotificationService({ page: state.page, limit: LIMIT })
      ).unwrap();

      if (response?.result?.docs) {
        setState((prev: NotificationListResponseI) => ({
          ...prev,
          list: [...prev.list, ...response.result.docs],
          page: prev.page + 1,
          hasNext: response.result.hasNextPage,
          listRefreshing: false,
        }));
      }
    } catch (error) {
      console.log("Error while fetching notifications: ", error);
    }
  }, [dispatch, state.page]);

  const loadMoreItems = useCallback(() => {
    if (!state.listRefreshing && state.hasNext) {
      getNotificationList();
    }
  }, [state.listRefreshing, state.hasNext, getNotificationList]);

  const onRefresh = useCallback(async () => {
    if (state.listRefreshing || refreshing) return;

    setRefreshing(true);

    try {
      const response: ListNotificationResponseI = await dispatch(
        listNotificationService({ page: 1, limit: LIMIT })
      ).unwrap();

      if (response?.result?.docs) {
        setState((prevState: NotificationListResponseI) => ({
          ...prevState,
          list: response.result.docs,
          page: 2,
          hasNext: response.result.hasNextPage,
          listRefreshing: false,
        }));
      }
    } catch (err) {
      console.log("Error while refreshing notifications: ", err);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch, refreshing, state.listRefreshing]);

  const renderLoader = () => {
    return state.listRefreshing && <LoadingIndicator color={colors.primary} containerStyle={styles.loaderStyle} />;
  };

  useEffect(() => {
    getNotificationList();

    return () => {
      setState({ ...state, list: [], page: 1, hasNext: false });
    };
  }, []);

  return (
    <GestureHandlerRootView style={[styles.container, { flex: 1 }]}>
      <Header
        headerText="Notifications"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
        titleStyle={{ color: theme.colors.heading }}
      />

      <FlatList
        data={state.list}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <NotificationCard item={item} onPress={onNotificationPress} onNotificationDismiss={onNotificationDismiss} />
        )}
        style={styles.notiList}
        contentContainerStyle={styles.notiListContainer}
        onEndReached={loadMoreItems}
        ListFooterComponent={renderLoader}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={() =>
          !state.listRefreshing &&
          !refreshing &&
          state.list.length === 0 && (
            <EmptyListText text="You have no notifications!" textStyle={styles.emptyTextPlaceholder} />
          )
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        nestedScrollEnabled={true}
      />
    </GestureHandlerRootView>
  );
};

export { NotificationScreen };
