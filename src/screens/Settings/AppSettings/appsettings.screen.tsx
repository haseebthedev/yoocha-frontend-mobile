import { FC, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import { colors } from "theme";
import { setMode } from "store";
import { ScreenEnum } from "enums";
import { useAppTheme } from "hooks";
import { useAppDispatch } from "store";
import { AppSettingsItem, Text } from "components";

import createStyles from "./appsettings.styles";

const AppSettingsScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.APP_SETTNGS>> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();

  const { theme, darkMode } = useAppTheme();
  const styles = createStyles(theme);

  const [pushNotifications, setPushNotifications] = useState<boolean>(false);
  // const [messageNotifications, setMessageNotifications] = useState<boolean>(false);
  const [friendRequestNotifications, setFriendRequestNotifications] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {/* App Header */}
      <View style={styles.appHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" color={colors.white} size={24} />
        </TouchableOpacity>
        <Text text="Settings" preset="logo" style={{ color: colors.white }} />
        <Ionicons name="chevron-forward" color={colors.primary} size={24} />
      </View>

      <View style={styles.contentContainer}>
        <Text text="GENERAL" style={{ color: theme.colors.heading }} />

        <AppSettingsItem
          iconName="invert-mode-outline"
          itemText="Dark Mode"
          iconColor={theme.colors.iconColor}
          switchValue={darkMode}
          onSwitchChange={() => dispatch(setMode(!darkMode))}
          textColor={theme.colors.heading}
        />
        <AppSettingsItem
          iconName="notifications"
          itemText="Allow Push Notifications"
          iconColor={theme.colors.iconColor}
          switchValue={pushNotifications}
          onSwitchChange={() => setPushNotifications(!pushNotifications)}
          textColor={theme.colors.heading}
        />
        {/* <AppSettingsItem
          iconName="chatbubbles-outline"
          itemText="Message Notifications"
          iconColor={theme.colors.iconColor}
          switchValue={messageNotifications}
          onSwitchChange={() => setMessageNotifications(!messageNotifications)}
          textColor={theme.colors.heading}
        /> */}
        <AppSettingsItem
          iconName="people-circle-outline"
          itemText="Friend Request Notifications"
          iconColor={theme.colors.iconColor}
          switchValue={friendRequestNotifications}
          onSwitchChange={() => setFriendRequestNotifications(!friendRequestNotifications)}
          textColor={theme.colors.heading}
        />
      </View>
    </View>
  );
};

export { AppSettingsScreen };
