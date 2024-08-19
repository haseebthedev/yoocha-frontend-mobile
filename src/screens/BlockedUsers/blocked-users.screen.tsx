import { FC, useEffect, useState } from "react";
import { FlatList, View, RefreshControl } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "theme";
import { ScreenEnum } from "enums";
import { useAppTheme } from "hooks";
import { ListWithPagination } from "interfaces";
import { NavigatorParamList } from "navigators";
import { AlertBox, AppHeading, ContactUserCard, EmptyListText, Header, LoadingIndicator } from "components";
import {
  BlockedUserInfo,
  ListBlockedUsersResponseI,
  RootState,
  UserInfo,
  getBlockedUsersService,
  unblockUserService,
  useAppDispatch,
  useAppSelector,
} from "store";
import createStyles from "./blocked-users.styles";

const LIMIT: number = 10;

const BlockedUsersScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.BLOCKED_USERS>> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [refreshing, setRefreshing] = useState(false);
  const [unblockUserId, setUnblockUserId] = useState<string>("");
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [itemIdToBeUnblocked, setItemIdToBeUnblocked] = useState<string>("");
  const [state, setState] = useState<ListWithPagination<BlockedUserInfo>>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });

  const onCloseAlertBoxPress = () => setAlertModalVisible((prev) => !prev);

  const unblockUser = async (item: UserInfo) => {
    let userIdToBeBlocked = item.initiator._id === user?._id ? item?.invitee?._id : item.initiator._id;
    setAlertModalVisible((prev) => !prev);
    setUnblockUserId(userIdToBeBlocked);
    setItemIdToBeUnblocked(item._id);
  };

  const confirmUnblockUser = async () => {
    const filteredUsers = state.list.filter((item) => itemIdToBeUnblocked !== item._id);
    setAlertModalVisible((prev) => !prev);
    setState((prev: ListWithPagination<BlockedUserInfo>) => ({
      ...prev,
      list: filteredUsers,
      page: 1 + prev?.page,
      hasNext: prev?.hasNext,
    }));

    await dispatch(unblockUserService({ id: unblockUserId }));
  };

  const getBlockedUsers = async () => {
    setState((prev: ListWithPagination<BlockedUserInfo>) => ({
      ...prev,
      listRefreshing: true,
    }));

    await dispatch(getBlockedUsersService({ page: state.page, limit: LIMIT }))
      .unwrap()
      .then((response: ListBlockedUsersResponseI) => {
        if (response?.result?.docs) {
          setState((prev: ListWithPagination<BlockedUserInfo>) => ({
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
      getBlockedUsers();
    }
  };

  const onRefresh = async () => {
    if (state.listRefreshing || refreshing) {
      return;
    }

    setRefreshing(true);

    setState((prev: ListWithPagination<BlockedUserInfo>) => ({
      ...prev,
      page: 1,
      hasNext: false,
    }));

    await dispatch(getBlockedUsersService({ page: 1, limit: LIMIT }))
      .unwrap()
      .then((response: ListBlockedUsersResponseI) => {
        if (response?.result?.docs) {
          setState((prev: ListWithPagination<BlockedUserInfo>) => ({
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
    getBlockedUsers();

    return () => {
      setState({ ...state, list: [], page: 1, hasNext: false });
    };
  }, []);

  return (
    <View style={styles.container}>
      <Header
        headerText="Blocked Users"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
        titleStyle={styles.headerTitle}
        iconStyle={colors.white}
      />

      <View style={styles.roundedContainer}>
        <AppHeading title="Block Users" />

        <FlatList
          data={state.list}
          keyExtractor={(item: BlockedUserInfo) => item._id}
          renderItem={({ item }: { item: UserInfo }) => (
            <ContactUserCard
              item={item?.initiator?._id === user?._id ? item.invitee : item.initiator}
              onBtnPress={() => unblockUser(item)}
              btnTitle="Unblock"
            />
          )}
          onEndReached={loadMoreItems}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={0.4}
          ListEmptyComponent={() =>
            !state.listRefreshing &&
            !refreshing &&
            state.list.length === 0 && (
              <EmptyListText text="Block List is Empty!" textStyle={styles.emptyTextPlaceholder} />
            )
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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

export { BlockedUsersScreen };
