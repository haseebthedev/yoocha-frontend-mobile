import { FC, useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "theme";
import { useAppTheme } from "hooks";
import { useAppDispatch } from "store";
import { ListWithPagination } from "interfaces";
import { NavigatorParamList } from "navigators";
import { NotificationEnum, ScreenEnum } from "enums";
import { listNotificationService, readNotificationService } from "store/slice/notification/notificationService";
import { EmptyListText, Header, LoadingIndicator, NotificationCard } from "components";
import { ListNotificationResponseI, NotificationI, NotificationResponseI } from "store/slice/notification/types";
import createStyles from "./notification.styles";

const LIMIT: number = 10;

const NotificationScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.NOTIFICATIONS>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [state, setState] = useState<ListWithPagination<NotificationI>>({
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

        setState((prev: ListWithPagination<NotificationI>) => ({
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

  const getNotificationList = async () => {
    setState((prev: ListWithPagination<NotificationI>) => ({
      ...prev,
      listRefreshing: true,
    }));

    await dispatch(listNotificationService({ page: state.page, limit: LIMIT }))
      .unwrap()
      .then((response: ListNotificationResponseI) => {
        if (response?.result?.docs) {
          setState((prev: ListWithPagination<NotificationI>) => ({
            ...prev,
            list: prev.list.concat(response.result.docs),
            page: 1 + prev.page,
            hasNext: response.result.hasNextPage,
            listRefreshing: false,
          }));
        }
      })
      .catch((error) => console.log("error: ", error));
  };

  const loadMoreItems = () => {
    if (!state.listRefreshing && state.hasNext) {
      getNotificationList();
    }
  };

  const onRefresh = async () => {
    if (state.listRefreshing || refreshing) {
      return;
    }

    setRefreshing(true);

    try {
      const response: ListNotificationResponseI = await dispatch(
        listNotificationService({ page: 1, limit: LIMIT })
      ).unwrap();

      if (response?.result?.docs) {
        setState((prevState: ListWithPagination<NotificationI>) => ({
          ...prevState,
          list: response.result.docs,
          page: 2,
          hasNext: response.result.hasNextPage,
          isListRefreshing: false,
        }));
      }
    } catch (err) {
      console.log("Err: ", err);
    } finally {
      setRefreshing(false);
    }
  };

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
    <View style={styles.container}>
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
        renderItem={({ item }) => <NotificationCard item={item} onPress={onNotificationPress} />}
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
      />
    </View>
  );
};

export { NotificationScreen };
