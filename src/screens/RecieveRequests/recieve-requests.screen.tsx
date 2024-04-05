import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { colors } from "theme";
import { socket } from "socket";
import { showFlashMessage } from "utils/flashMessage";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EventEnum, EventEnumRole } from "enums";
import { BlockedUsersI, UserRequestsI } from "interfaces";
import { AlertBox, ContactUserCard, EmptyListText, Header, Text } from "components";
import {
  BlockedUserInfo,
  ListUserRequestsResponseI,
  RootState,
  UserInfo,
  getUsersRequestsService,
  useAppDispatch,
  useAppSelector,
} from "store";
import styles from "./recieve-requests.styles";

const LIMIT: number = 10;

const RecieveRequestsScreen: FC<NativeStackScreenProps<NavigatorParamList, "recieverequests">> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [friendId, setFriendId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);

  const [state, setState] = useState<UserRequestsI>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  const onCloseAlertBoxPress = () => setAlertModalVisible((prev) => !prev);

  const acceptRequest = async (roomId: string, fId: string) => {
    setAlertModalVisible((prev) => !prev);
    setFriendId(fId);
    const payload = {
      roomId: roomId,
      inviteeId: user?._id,
    };

    if (socket) {
      socket.emit(EventEnum.JOIN_ROOM, payload);

      showFlashMessage({ type: "success", message: "Request is Accepted!" });
    }
  };

  const confirmAcceptRequest = async () => {
    const filteredUsers = state.list.filter((user) => user.user?._id != friendId);
    setState((prev: BlockedUsersI) => ({
      ...prev,
      list: filteredUsers,
      page: 1 + prev?.page,
      hasNext: prev?.hasNext,
    }));

    setAlertModalVisible((prev) => !prev);
  };

  const getUserRequests = async () => {
    setIsLoading(true);
    await dispatch(getUsersRequestsService({ role: EventEnumRole.INVITEE, page: state.page, limit: LIMIT }))
      .unwrap()
      .then((response: ListUserRequestsResponseI) => {
        if (response?.result?.docs) {
          console.log("recieve reqs === ", response?.result?.docs);

          setState((prev: UserRequestsI) => ({
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
      getUserRequests();
    }
  };

  const renderLoader = () => {
    return isLoading ? (
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
        <Text text="Recieved Requests" style={styles.listHeading} />

        <FlatList
          data={state.list}
          keyExtractor={(item: BlockedUserInfo) => item._id}
          renderItem={({ item }: { item: UserInfo }) => (
            <ContactUserCard
              item={item?.initiator._id === user?._id ? item.invitee : item.initiator}
              onAddBtnPress={() => acceptRequest(item?._id, item?.user?._id)}
              btnTitle="Accept"
            />
          )}
          onEndReached={loadMoreItems}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={0.4}
          ListEmptyComponent={() => !isLoading && <EmptyListText text="Requests List is Empty!" />}
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
