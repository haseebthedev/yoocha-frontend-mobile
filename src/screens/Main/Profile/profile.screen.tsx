import { FC, useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";

import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from "theme";
import { ScreenEnum } from "enums";
import { useAppTheme } from "hooks";
import { AlertBox, SettingListItem, Text } from "components";
import {
  RootState,
  deleteMyProfileService,
  getMyProfileService,
  logoutUser,
  useAppDispatch,
  useAppSelector,
} from "store";
import createStyles from "./profile.styles";
import personplaceholder from "assets/images/person.png";

const ProfileScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.PROFILE>> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const { user, loading } = useAppSelector((state: RootState) => state.auth);

  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [deleteAccModalVisible, setDeleteAccModalVisible] = useState<boolean>(false);

  const userName: string = `${user?.firstname} ${user?.lastname}` ?? `Guest`;

  const onLogoutPress = () => setAlertModalVisible((prev) => !prev);

  const onConfirmLogoutPress = async () => await dispatch(logoutUser());

  const onCloseAlertBoxPress = () => setAlertModalVisible((prev) => !prev);

  const onDelModalCancelPress = () => setDeleteAccModalVisible((prev) => !prev);

  const deleteAccountHandler = async () => {
    await dispatch(deleteMyProfileService())
      .unwrap()
      .then(() => navigation.navigate(ScreenEnum.SIGN_IN))
      .catch((err) => console.log("Error: ", err));
  };

  useEffect(() => {
    dispatch(getMyProfileService());
  }, []);

  return (
    <View style={styles.container}>
      {/* App Header */}
      <View style={styles.appHeader}>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" color={colors.white} size={24} />
        </TouchableOpacity>
        <Text text="YOOCHAT" preset="logo" style={styles.headerText} />

        <TouchableOpacity onPress={onLogoutPress}>
          <Ionicons name="log-out-outline" color={colors.white} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.roundedContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={user?.profilePicture ? { uri: user.profilePicture } : personplaceholder}
              style={user?.profilePicture ? styles.profilePic : styles.imagePlaceholder}
            />
          </View>
          <Text text={userName} preset="largeHeading" style={styles.name} />

          <View style={styles.listItems}>
            <SettingListItem
              iconName="person-circle-outline"
              listText="Account Details"
              onPress={() => navigation.navigate(ScreenEnum.EDIT_PROFILE)}
            />
            <SettingListItem
              iconName="key-outline"
              listText="Change Password"
              onPress={() => navigation.navigate(ScreenEnum.CHANGE_PASSWORD)}
            />
            <SettingListItem
              iconName="settings-outline"
              listText="Settings"
              onPress={() => navigation.navigate(ScreenEnum.APP_SETTNGS)}
            />
            <SettingListItem
              iconName="lock-closed-outline"
              listText="Blocked Users"
              onPress={() => navigation.navigate(ScreenEnum.BLOCKED_USERS)}
            />
            <SettingListItem
              iconName="mail-outline"
              listText="Contact Us"
              onPress={() => navigation.navigate(ScreenEnum.CONTACT_US)}
            />
            <SettingListItem
              iconName="trash-outline"
              iconColor={colors.red}
              textColor={colors.red}
              listText="Delete Account"
              onPress={() => setDeleteAccModalVisible((prev) => !prev)}
            />
          </View>
        </View>
      </View>
      <AlertBox
        open={alertModalVisible}
        title="Logout!"
        description="Are you sure you want to logout?"
        onClose={onCloseAlertBoxPress}
        secondaryButtonText="Cancel"
        primaryButtonText="Logout"
        secondaryOnClick={() => setAlertModalVisible((prev) => !prev)}
        primaryOnClick={onConfirmLogoutPress}
      />

      <AlertBox
        open={deleteAccModalVisible}
        type="error"
        title="Delete Account!"
        description="Are you sure you want to delete your account permanently?"
        onClose={onDelModalCancelPress}
        primaryButtonText="Delete"
        primaryOnClick={deleteAccountHandler}
        secondaryButtonText="Cancel"
        secondaryOnClick={() => setDeleteAccModalVisible((prev) => !prev)}
        loading={loading}
      />
    </View>
  );
};

export { ProfileScreen };
