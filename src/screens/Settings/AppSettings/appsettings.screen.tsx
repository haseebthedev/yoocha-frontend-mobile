import { FC, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import { colors } from "theme";
import { setMode } from "store/slice/mode/modeReducer";
import { AppSettingsItem, Text } from "components";
import { useAppDispatch, useAppSelector, RootState } from "store";
import styles from "./appsettings.styles";

const AppSettingsScreen: FC<NativeStackScreenProps<NavigatorParamList, "appsettings">> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state: RootState) => state.mode);

  const [pushNotifications, setPushNotifications] = useState<boolean>(false);
  const [messageNotifications, setMessageNotifications] = useState<boolean>(false);
  const [friendRequestNotifications, setFriendRequestNotifications] = useState<boolean>(false);

  const iconColor: string = darkMode ? colors.lightShade : colors.textDim;
  const textColor: string = darkMode ? colors.white : colors.black;

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

      <View style={[styles.contentContainer, { backgroundColor: darkMode ? colors.black : colors.white }]}>
        <Text
          text="GENERAL"
          style={{ color: darkMode ? colors.lightShade : colors.textDim, fontSize: 14, marginBottom: 10 }}
        />

        <AppSettingsItem
          iconName="invert-mode-outline"
          itemText="Dark Mode"
          iconColor={iconColor}
          switchValue={darkMode}
          onSwitchChange={() => dispatch(setMode(!darkMode))}
          textColor={textColor}
        />
        <AppSettingsItem
          iconName="push-outline"
          itemText="Allow Push Notifications"
          iconColor={iconColor}
          switchValue={pushNotifications}
          onSwitchChange={() => setPushNotifications(!pushNotifications)}
          textColor={textColor}
        />
        <AppSettingsItem
          iconName="chatbubbles-outline"
          itemText="Message Notifications"
          iconColor={iconColor}
          switchValue={messageNotifications}
          onSwitchChange={() => setMessageNotifications(!messageNotifications)}
          textColor={textColor}
        />
        <AppSettingsItem
          iconName="people-circle-outline"
          itemText="Friend Request Notifications"
          iconColor={iconColor}
          switchValue={friendRequestNotifications}
          onSwitchChange={() => setFriendRequestNotifications(!friendRequestNotifications)}
          textColor={textColor}
        />
      </View>
    </View>
  );
};

export { AppSettingsScreen };
