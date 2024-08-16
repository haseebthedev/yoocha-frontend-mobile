import { FC, useEffect, useState } from "react";
import { FlatList, View, RefreshControl } from "react-native";

import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "theme";
import { useAppTheme } from "hooks";
import { ListWithPagination } from "interfaces";
import { EventEnumRole, ScreenEnum } from "enums";
import { AlertBox, AppHeading, ContactUserCard, EmptyListText, Header, LoadingIndicator } from "components";
import {
  ListUserRequestsResponseI,
  RootState,
  UserInfo,
  getUsersRequestsService,
  removeFriendRequest,
  useAppDispatch,
  useAppSelector,
} from "store";
import createStyles from "./send-requests.styles";

const LIMIT: number = 10;

const SendRequestsScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.SEND_REQUESTS>> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [friendId, setFriendId] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [state, setState] = useState<ListWithPagination<UserInfo>>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  const onCloseAlertBoxPress = () => setAlertModalVisible((prev) => !prev);

  const removeRequest = async (userId: string) => {
    setAlertModalVisible((prev) => !prev);
    setFriendId(userId);
  };

  const confirmRemoveRequest = async () => {
    const filteredUsers = state.list.filter((user) => user?.invitee?._id != friendId);

    setAlertModalVisible((prev) => !prev);

    setState((prev: ListWithPagination<UserInfo>) => ({
      ...prev,
      list: filteredUsers,
      page: 1 + prev?.page,
      hasNext: prev?.hasNext,
    }));

    await dispatch(removeFriendRequest({ inviteeId: friendId }));
  };

  const getUserRequests = async () => {
    setState((prev: ListWithPagination<UserInfo>) => ({
      ...prev,
      listRefreshing: true,
    }));

    await dispatch(getUsersRequestsService({ type: EventEnumRole.INITIATOR, page: state.page, limit: LIMIT }))
      .unwrap()
      .then((response: ListUserRequestsResponseI) => {
        if (response?.result?.docs) {
          setState((prev: ListWithPagination<UserInfo>) => ({
            ...prev,
            list: prev.list.concat(response?.result?.docs),
            page: 1 + prev?.page,
            hasNext: response?.result?.hasNextPage,
            listRefreshing: false,
          }));
        }
      })
      .catch((err) => console.log("Error: ", err))
      .finally(() => {
        setRefreshing(false);
      });
  };

  const loadMoreItems = () => {
    if (!state.listRefreshing && state.hasNext) {
      getUserRequests();
    }
  };

  const renderLoader = () => {
    return state.listRefreshing && <LoadingIndicator color={colors.primary} containerStyle={styles.loaderStyle} />;
  };

  const onRefresh = async () => {
    if (state.listRefreshing || refreshing) {
      return;
    }

    setRefreshing(true);

    setState((prev: ListWithPagination<UserInfo>) => ({
      ...prev,
      page: 1,
      hasNext: false,
    }));

    await dispatch(getUsersRequestsService({ type: EventEnumRole.INITIATOR, page: 1, limit: LIMIT }))
      .unwrap()
      .then((response: ListUserRequestsResponseI) => {
        if (response?.result?.docs) {
          setState((prev: ListWithPagination<UserInfo>) => ({
            ...prev,
            list: response?.result?.docs,
            page: 2,
            hasNext: response?.result?.hasNextPage,
            listRefreshing: false,
          }));
        }
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getUserRequests();

    return () => {
      setState({ ...state, list: [], page: 1, hasNext: false });
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header
        headerText="Friend Requests"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
        titleStyle={styles.headerTitle}
        iconStyle={colors.white}
      />

      <View style={styles.roundedContainer}>
        <AppHeading title="Sent requests" />

        <FlatList
          data={state.list}
          keyExtractor={(item: UserInfo) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: UserInfo }) => (
            <ContactUserCard
              item={item?.initiator._id === user?._id ? item.invitee : item.initiator}
              onBtnPress={() => {
                removeRequest(item?.invitee?._id);
              }}
              btnTitle="Pending"
            />
          )}
          onEndReached={loadMoreItems}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={0.4}
          ListEmptyComponent={() =>
            !state.listRefreshing &&
            !refreshing &&
            state.list.length === 0 && (
              <EmptyListText text="No friend requests sent!" textStyle={styles.emptyTextPlaceholder} />
            )
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>

      <AlertBox
        open={alertModalVisible}
        title="Remove request!"
        description="Are you sure you want to remove request."
        onClose={onCloseAlertBoxPress}
        secondaryButtonText="Cancel"
        primaryButtonText="Remove"
        secondaryOnClick={() => setAlertModalVisible((prev) => !prev)}
        primaryOnClick={confirmRemoveRequest}
      />
    </View>
  );
};

export { SendRequestsScreen };
