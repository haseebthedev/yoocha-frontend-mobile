import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { colors } from "theme";
import { RefreshControl } from "react-native";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EventEnumRole } from "enums";
import { ListWithPagination } from "interfaces";
import { AlertBox, ContactUserCard, EmptyListText, Header, Text } from "components";
import {
  ListUserRequestsResponseI,
  RootState,
  UserInfo,
  getUsersRequestsService,
  removeFriendRequest,
  useAppDispatch,
  useAppSelector,
} from "store";
import styles from "./send-requests.styles";

const LIMIT: number = 10;

const SendRequestsScreen: FC<NativeStackScreenProps<NavigatorParamList, "sendrequests">> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [friendId, setFriendId] = useState<string>("");
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
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
      .then(() => {
        setRefreshing(false);
      });
  };

  const loadMoreItems = () => {
    if (!state.listRefreshing && state.hasNext) {
      getUserRequests();
    }
  };

  const renderLoader = () => {
    return state.listRefreshing ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator color={colors.primary} />
      </View>
    ) : null;
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

      <View style={styles.containerWithWhiteBg}>
        <Text text="Sent requests" style={styles.listHeading} />

        <FlatList
          data={state.list}
          keyExtractor={(item: UserInfo) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: UserInfo }) => (
            <ContactUserCard
              item={item?.initiator._id === user?._id ? item.invitee : item.initiator}
              onAddBtnPress={() => {
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
            state.list.length === 0 && <EmptyListText text="No requests are sent!" />
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
