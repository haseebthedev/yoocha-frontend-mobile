import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { colors } from "theme";
import { RefreshControl } from "react-native";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EventEnumRole } from "enums";
import { UserRequestsI } from "interfaces";
import { AlertBox, ContactUserCard, EmptyListText, Header, Text } from "components";
import {
  ListUserRequestsResponseI,
  RemoveFriendReqResponseI,
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
  const [state, setState] = useState<UserRequestsI>({
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
    setState((prev: UserRequestsI) => ({
      ...prev,
      list: filteredUsers,
      page: 1 + prev?.page,
      hasNext: prev?.hasNext,
    }));

    await dispatch(removeFriendRequest({ inviteeId: friendId }))
      .unwrap()
      .then((response: RemoveFriendReqResponseI) => {
        if (response?.result?.status) {
          setAlertModalVisible((prev) => !prev);
        }
      });
  };

  const getUserRequests = async () => {
    setState((prev: UserRequestsI) => ({
      ...prev,
      listRefreshing: true,
    }));

    await dispatch(getUsersRequestsService({ type: EventEnumRole.INITIATOR, page: state.page, limit: LIMIT }))
      .unwrap()
      .then((response: ListUserRequestsResponseI) => {
        if (response?.result?.docs) {
          setState((prev: UserRequestsI) => ({
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
    setState((prev: UserRequestsI) => ({
      ...prev,
      listRefreshing: true,
    }));

    await dispatch(getUsersRequestsService({ type: EventEnumRole.INITIATOR, page: 1, limit: LIMIT }))
      .unwrap()
      .then((response: ListUserRequestsResponseI) => {
        if (response?.result?.docs) {
          setState((prev: UserRequestsI) => ({
            ...prev,
            list: response?.result?.docs,
            page: 1 + prev?.page,
            hasNext: response?.result?.hasNextPage,
            listRefreshing: false,
          }));
        }
      });
  };

  const renderLoader = () => {
    return state.listRefreshing ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator color={colors.primary} />
      </View>
    ) : null;
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
          ListEmptyComponent={() => !state.listRefreshing && <EmptyListText text="Requests List is Empty!" />}
          refreshControl={<RefreshControl refreshing={state.listRefreshing} onRefresh={onRefresh} />}
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
