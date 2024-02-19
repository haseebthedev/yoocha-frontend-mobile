import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { colors } from "theme";
import { UserRequestsI } from "interfaces";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BlockedUserInfo, ListUserRequestsResponseI, getUsersRequestsService, useAppDispatch } from "store";
import { AlertBox, ContactUserCard, EmptyListText, Header, Text } from "components";
import styles from "./recieve-requests.styles";
import { EventEnumRole } from "enums";

const LIMIT: number = 10;

const RecieveRequestsScreen: FC<NativeStackScreenProps<NavigatorParamList, "recieverequests">> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [state, setState] = useState<UserRequestsI>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  const onCloseAlertBoxPress = () => setAlertModalVisible((prev) => !prev);

  const unblockUser = async (userId: string) => {
    setAlertModalVisible((prev) => !prev);
  };

  const confirmUnblockUser = async () => {
    setAlertModalVisible((prev) => !prev);
  };

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
        titleStyle={{ color: colors.white }}
        iconStyle={colors.white}
      />

      <View style={styles.containerWithWhiteBg}>
        <Text text="Recieved Requests" style={styles.listHeading} />

        <FlatList
          data={state.list}
          keyExtractor={(item: BlockedUserInfo) => item._id}
          renderItem={({ item }: { item: BlockedUserInfo }) => (
            <ContactUserCard item={item?.user} onAddBtnPress={() => unblockUser(item?.user?._id)} btnTitle="Unblock" />
          )}
          onEndReached={loadMoreItems}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={0.4}
          ListEmptyComponent={() => !isLoading && <EmptyListText text="Requests List is Empty!" />}
        />
      </View>

      <AlertBox
        open={alertModalVisible}
        title="Unblock!"
        description="Are you sure you want to unblock."
        onClose={onCloseAlertBoxPress}
        secondaryButtonText="Cancel"
        primaryButtonText="Unblock"
        secondaryOnClick={() => setAlertModalVisible((prev) => !prev)}
        primaryOnClick={confirmUnblockUser}
      />
    </View>
  );
};

export { RecieveRequestsScreen };
