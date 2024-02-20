import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { colors } from "theme";
import { socket } from "socket";
import { showMessage } from "react-native-flash-message";
import { EventEnum, EventEnumRole } from "enums";
import { UserRequestsI } from "interfaces";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AlertBox, ContactUserCard, EmptyListText, Header, Text } from "components";
import {
  BlockedUserInfo,
  ListUserRequestsResponseI,
  RootState,
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

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [state, setState] = useState<UserRequestsI>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  const onCloseAlertBoxPress = () => setAlertModalVisible((prev) => !prev);

  const removeRequest = async (userId: string) => setAlertModalVisible((prev) => !prev);

  const acceptRequest = async (roomId: string) => {
    //setAlertModalVisible((prev) => !prev);

    const payload = {
      roomId: roomId,
      inviteeId: user?._id,
    };

    console.log("payload === ", payload);

    if (socket) {
      socket.emit(EventEnum.JOIN_ROOM, payload);
    }

    // navigation.goBack();
  };

  const confirmRemoveRequest = async () => setAlertModalVisible((prev) => !prev);

  const getUserRequests = async () => {
    setIsLoading(true);
    await dispatch(getUsersRequestsService({ role: EventEnumRole.INVITEE, page: state.page, limit: LIMIT }))
      .unwrap()
      .then((response: ListUserRequestsResponseI) => {
        if (response?.result?.docs) {
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
          renderItem={({ item }: { item: BlockedUserInfo }) => (
            <ContactUserCard item={item?.user} onAddBtnPress={() => acceptRequest(item?._id)} btnTitle="Accept" />
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
        primaryOnClick={confirmRemoveRequest}
      />
    </View>
  );
};

export { RecieveRequestsScreen };
