import { FC, useState } from "react";
import { View } from "react-native";
import { AlertBox, Header, SettingListItem } from "components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from "theme";
import { NavigatorParamList } from "navigators";
import { logoutUser, useAppDispatch } from "store";
import styles from "./settings.styles";

const SettingsScreen: FC<NativeStackScreenProps<NavigatorParamList, "settings">> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();

  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [deleteAccModalVisible, setDeleteAccModalVisible] = useState<boolean>(false);

  const onLogoutPress = () => setAlertModalVisible((prev) => !prev);
  const onConfirmLogoutPress = async () => await dispatch(logoutUser());
  const onCloseAlertBoxPress = () => setAlertModalVisible((prev) => !prev);
  const onDelModalCancelPress = () => setDeleteAccModalVisible((prev) => !prev);

  return (
    <View style={styles.container}>
      <Header
        headerText="Settings"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
        titleStyle={{ color: colors.white }}
        iconStyle={colors.white}
      />

      <View style={styles.listContainer}>
        <View style={styles.spacing}>
          <SettingListItem
            iconName="person-circle-outline"
            listText="Account Details"
            onPress={() => navigation.navigate("editprofile")}
          />
          <SettingListItem
            iconName="key-outline"
            listText="Change Password"
            onPress={() => navigation.navigate("changePassword")}
          />
          <SettingListItem
            iconName="settings-outline"
            listText="Settings"
            onPress={() => navigation.navigate("appsettings")}
          />
          <SettingListItem
            iconName="lock-closed-outline"
            listText="Blocked Users"
            onPress={() => navigation.navigate("blockedusers")}
          />
          <SettingListItem
            iconName="mail-outline"
            listText="Contact Us"
            onPress={() => navigation.navigate("contactUs")}
          />
          <SettingListItem iconName="log-out-outline" listText="Logout" onPress={onLogoutPress} />
          <SettingListItem
            iconName="trash-outline"
            iconColor={colors.red}
            textColor={colors.red}
            listText="Delete Account"
            onPress={() => setDeleteAccModalVisible((prev) => !prev)}
          />
        </View>
      </View>

      <AlertBox
        open={alertModalVisible}
        type="error"
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
        secondaryButtonText="Cancel"
        primaryButtonText="Delete"
        secondaryOnClick={() => setDeleteAccModalVisible((prev) => !prev)}
        buttonColor={colors.red}
      />
    </View>
  );
};

export { SettingsScreen };
