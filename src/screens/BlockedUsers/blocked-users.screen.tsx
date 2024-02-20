import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { colors } from "theme";
import { BlockedUsersI } from "interfaces";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  BlockedUserInfo,
  ListBlockedUsersResponseI,
  getBlockedUsersService,
  unblockUserService,
  useAppDispatch,
} from "store";
import { AlertBox, ContactUserCard, EmptyListText, Header, Text } from "components";
import styles from "./blocked-users.styles";

const LIMIT: number = 10;

const BlockedUsersScreen: FC<NativeStackScreenProps<NavigatorParamList, "blockedusers">> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [state, setState] = useState<BlockedUsersI>({
    list: [],
    page: 1,
    hasNext: false,
    listRefreshing: false,
  });
  const [unblockUserId, setUnblockUserId] = useState<string>("");

  const onCloseAlertBoxPress = () => setAlertModalVisible((prev) => !prev);

  const unblockUser = async (userId: string) => {
    setAlertModalVisible((prev) => !prev);
    setUnblockUserId(userId);
  };

  const confirmUnblockUser = async () => {
    await dispatch(unblockUserService({ userId: unblockUserId }));
    setAlertModalVisible((prev) => !prev);
    navigation.goBack();
  };

  const getBlockedUsers = async () => {
    setIsLoading(true);
    await dispatch(getBlockedUsersService({ page: state.page, limit: LIMIT }))
      .unwrap()
      .then((response: ListBlockedUsersResponseI) => {
        if (response?.result?.docs) {
          setState((prev: BlockedUsersI) => ({
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
      getBlockedUsers();
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

      <View style={styles.containerWithWhiteBg}>
        <Text text="Block users list" style={styles.listHeading} />

        <FlatList
          data={state.list}
          keyExtractor={(item: BlockedUserInfo) => item._id}
          renderItem={({ item }: { item: BlockedUserInfo }) => (
            <ContactUserCard item={item?.user} onAddBtnPress={() => unblockUser(item?.user?._id)} btnTitle="Unblock" />
          )}
          onEndReached={loadMoreItems}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={0.4}
          ListEmptyComponent={() => !isLoading && <EmptyListText text="Block List is Empty!" />}
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
