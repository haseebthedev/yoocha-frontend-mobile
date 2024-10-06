import { FC, useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "theme";
import { useAppTheme } from "hooks";
import { ListWithPagination } from "interfaces";
import { NavigatorParamList } from "navigators";
import { EventEnumRole, ScreenEnum } from "enums";
import { AlertBox, AppHeading, ContactUserCard, EmptyListText, Header, LoadingIndicator } from "components";
import {
  BlockedUserInfo,
  ListUserRequestsResponseI,
  RootState,
  UserInfo,
  acceptFriendRequest,
  getUsersRequestsService,
  useAppDispatch,
  useAppSelector,
} from "store";
import createStyles from "./recieve-requests.styles";
import { showFlashMessage } from "utils/flashMessage";

const LIMIT: number = 10;

const RecieveRequestsScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.RECIEVED_REQUESTS>> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [roomId, setRoomId] = useState<string>("");
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

  const acceptRequest = async (roomId: string, fId: string) => {
    setAlertModalVisible((prev) => !prev);
    setFriendId(fId);
    setRoomId(roomId);
  };

  const confirmAcceptRequest = async () => {
    try {
      const updatedList = state.list.filter((user) => user?.initiator._id != friendId);
      setAlertModalVisible((prev) => !prev);

      setState((prev: ListWithPagination<UserInfo>) => ({
        ...prev,
        list: updatedList,
        page: 1 + prev?.page,
        hasNext: prev?.hasNext,
      }));

      await dispatch(acceptFriendRequest({ roomId })).unwrap();
    } catch (err) {
      showFlashMessage({ type: "danger", message: `Error while accepting friend request: ${err}` });
      // console.error("Error while accepting friend request: ", err);
    }
  };

  const getUserRequests = async () => {
    setState((prev: ListWithPagination<UserInfo>) => ({
      ...prev,
      listRefreshing: true,
    }));

    await dispatch(getUsersRequestsService({ type: EventEnumRole.INVITEE, page: state.page, limit: LIMIT }))
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
      });
  };

  const loadMoreItems = () => {
    if (!state.listRefreshing && state.hasNext) {
      getUserRequests();
    }
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

    await dispatch(getUsersRequestsService({ type: EventEnumRole.INVITEE, page: 1, limit: LIMIT }))
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

  const renderLoader = () => {
    return state.listRefreshing && <LoadingIndicator color={colors.primary} containerStyle={styles.loaderStyle} />;
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
        <AppHeading title="Recieved Requests" />

        <FlatList
          data={state.list}
          keyExtractor={(item: BlockedUserInfo) => item._id}
          renderItem={({ item }: { item: UserInfo }) => (
            <ContactUserCard
              item={item?.initiator._id === user?._id ? item.invitee : item.initiator}
              onBtnPress={() => acceptRequest(item?._id, item?.initiator._id)}
              btnTitle="Accept"
            />
          )}
          onEndReached={loadMoreItems}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={0.4}
          ListEmptyComponent={() =>
            !state.listRefreshing &&
            !refreshing &&
            state.list.length === 0 && (
              <EmptyListText text="You don't have any Friend Requests!" textStyle={styles.emptyTextPlaceholder} />
            )
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>

      <AlertBox
        open={alertModalVisible}
        title="Accept Request!"
        description="Are you sure you want to accept request."
        onClose={onCloseAlertBoxPress}
        secondaryButtonText="Cancel"
        primaryButtonText="Accept"
        secondaryOnClick={() => setAlertModalVisible((prev) => !prev)}
        primaryOnClick={confirmAcceptRequest}
      />
    </View>
  );
};

export { RecieveRequestsScreen };
