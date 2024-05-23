import { FC, useState } from "react";
import { View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "theme";
import { NavigatorParamList } from "navigators";
import { RootState, logoutUser, useAppDispatch, useAppSelector } from "store";
import { AlertBox, Header, SettingListItem } from "components";
import styles from "./settings.styles";

const SettingsScreen: FC<NativeStackScreenProps<NavigatorParamList, "settings">> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state: RootState) => state.mode);

  const iconColor: string = darkMode ? colors.lightShade : colors.textDim;
  const textColor: string = darkMode ? colors.lightShade : colors.textDim;

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
        titleStyle={styles.headerTitle}
        iconStyle={colors.white}
      />

      <View style={[styles.listContainer, { backgroundColor: darkMode ? colors.black : colors.white }]}>
        <View style={styles.spacing}>
          <SettingListItem
            iconName="person-circle-outline"
            listText="Account Details"
            onPress={() => navigation.navigate("editprofile")}
            iconColor={iconColor}
            textColor={textColor}
          />
          <SettingListItem
            iconName="key-outline"
            listText="Change Password"
            onPress={() => navigation.navigate("changePassword")}
            iconColor={iconColor}
            textColor={textColor}
          />
          <SettingListItem
            iconName="settings-outline"
            listText="Settings"
            onPress={() => navigation.navigate("appsettings")}
            iconColor={iconColor}
            textColor={textColor}
          />
          <SettingListItem
            iconName="lock-closed-outline"
            listText="Blocked Users"
            onPress={() => navigation.navigate("blockedusers")}
            iconColor={iconColor}
            textColor={textColor}
          />
          <SettingListItem
            iconName="mail-outline"
            listText="Contact Us"
            onPress={() => navigation.navigate("contactUs")}
            iconColor={iconColor}
            textColor={textColor}
          />
          <SettingListItem
            iconName="log-out-outline"
            listText="Logout"
            onPress={onLogoutPress}
            iconColor={iconColor}
            textColor={textColor}
          />
        </View>
      </View>
      <View style={[styles.deleteAccount, { backgroundColor: darkMode ? colors.black : colors.white }]}>
        <SettingListItem
          iconName="trash-outline"
          iconColor={colors.red}
          textColor={colors.red}
          listText="Delete Account"
          onPress={() => setDeleteAccModalVisible((prev) => !prev)}
        />
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
        secondaryButtonText="Cancel"
        primaryButtonText="Delete"
        secondaryOnClick={() => setDeleteAccModalVisible((prev) => !prev)}
      />
    </View>
  );
};

export { SettingsScreen };
