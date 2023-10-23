import { FC } from "react";
import { Text } from "components";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { hp, wp } from "utils/responsive";
import { colors, typography } from "theme";
import { BLOCKED_CONTACTS_DATA } from "constant";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./settings.styles";

const SettingsScreen: FC<NativeStackScreenProps<NavigatorParamList, "settings">> = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      {/* App Header */}
      <View style={styles.appHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" color={colors.white} size={24} />
        </TouchableOpacity>
        <Text text="Settings" preset="logo" style={{ color: colors.white }} />
        <MaterialCommunityIcons name="menu" color={colors.primary} size={24} />
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          paddingHorizontal: wp(5),
        }}
      >
        <View style={{ marginTop: hp(3), paddingHorizontal: wp(5) }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("editprofile")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              paddingVertical: 15,
              borderBottomColor: colors.lightShade,
              borderBottomWidth: 1,
            }}
          >
            <Ionicons name="person-circle-outline" size={20} color={colors.textDim} />
            <Text
              text="Account Details"
              style={{ fontFamily: typography.regular, fontSize: 16, marginTop: 3, color: colors.textDark }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("appsettings")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              paddingVertical: 15,
              borderBottomColor: colors.lightShade,
              borderBottomWidth: 1,
            }}
          >
            <Ionicons name="settings-outline" size={20} color={colors.textDim} />
            <Text
              text="Settings"
              style={{ fontFamily: typography.regular, fontSize: 16, marginTop: 3, color: colors.textDark }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("blockedusers")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              paddingVertical: 15,
              borderBottomColor: colors.lightShade,
              borderBottomWidth: 1,
            }}
          >
            <Ionicons name="lock-closed-outline" size={20} color={colors.textDim} />
            <Text
              text="Blocked Users"
              style={{ fontFamily: typography.regular, fontSize: 16, marginTop: 3, color: colors.textDark }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              paddingVertical: 15,
              borderBottomColor: colors.lightShade,
              borderBottomWidth: 1,
            }}
          >
            <Ionicons name="mail-outline" size={20} color={colors.textDim} />
            <Text
              text="Contact Us"
              style={{ fontFamily: typography.regular, fontSize: 16, marginTop: 3, color: colors.textDark }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              paddingVertical: 15,
              borderBottomColor: colors.lightShade,
              borderBottomWidth: 1,
            }}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.textDim} />
            <Text
              text="Logout"
              style={{ fontFamily: typography.regular, fontSize: 16, marginTop: 3, color: colors.textDark }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              paddingVertical: 15,
              borderBottomColor: colors.lightShade,
              borderBottomWidth: 1,
            }}
          >
            <Ionicons name="trash-outline" size={20} color={colors.red} />
            <Text
              text="Delete Account"
              style={{ fontFamily: typography.regular, fontSize: 16, marginTop: 3, color: colors.red }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export { SettingsScreen };
