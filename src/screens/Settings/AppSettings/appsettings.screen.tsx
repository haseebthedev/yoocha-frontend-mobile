import { FC } from "react";
import { Text } from "components";
import { Image, Switch, TextInput, TouchableOpacity, View } from "react-native";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { hp, wp } from "utils/responsive";
import { colors, typography } from "theme";
import { BLOCKED_CONTACTS_DATA, MY_PROFILE_DATA } from "constant";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./appsettings.styles";

const AppSettingsScreen: FC<NativeStackScreenProps<NavigatorParamList, "appsettings">> = ({ navigation, route }) => {
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

      <View
        style={{
          backgroundColor: colors.white,
          flex: 1,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          paddingHorizontal: wp(5),
          paddingTop: hp(4),
        }}
      >
        <Text text="GENERAL" style={{ color: colors.textDim, fontSize: 14, marginBottom: 10 }} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 15,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="invert-mode-outline" size={20} color={colors.textDim} />
            <Text
              text="Dark Mode"
              style={{ fontFamily: typography.regular, fontSize: 14, marginTop: 3, color: colors.textDark }}
            />
          </View>
          <Switch />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 15,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="push-outline" size={20} color={colors.textDim} />
            <Text
              text="Allow Push Notifcations"
              style={{ fontFamily: typography.regular, fontSize: 14, marginTop: 3, color: colors.textDark }}
            />
          </View>
          <Switch />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 15,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="chatbubbles-outline" size={20} color={colors.textDim} />
            <Text
              text="Message Notifitions"
              style={{ fontFamily: typography.regular, fontSize: 14, marginTop: 3, color: colors.textDark }}
            />
          </View>
          <Switch />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 15,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Ionicons name="people-circle-outline" size={20} color={colors.textDim} />
            <Text
              text="Friend Request Notification"
              style={{ fontFamily: typography.regular, fontSize: 14, marginTop: 3, color: colors.textDark }}
            />
          </View>
          <Switch />
        </View>
      </View>
    </View>
  );
};

export { AppSettingsScreen };
