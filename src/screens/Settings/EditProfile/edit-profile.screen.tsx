import { FC } from "react";
import { Text } from "components";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { hp, wp } from "utils/responsive";
import { colors, typography } from "theme";
import { BLOCKED_CONTACTS_DATA, MY_PROFILE_DATA } from "constant";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./edit-profile.styles";

const EditProfileScreen: FC<NativeStackScreenProps<NavigatorParamList, "editprofile">> = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      {/* App Header */}
      <View style={styles.appHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" color={colors.textDark} size={24} />
        </TouchableOpacity>
        <Text text="Edit Profile" preset="logo" />
        <Ionicons name="chevron-forward" color={colors.white} size={24} />
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          paddingHorizontal: wp(5),
        }}
      >
        <View style={{ alignSelf: "center" }}>
          <Image
            source={{ uri: MY_PROFILE_DATA.profilePic }}
            style={{
              marginTop: 20,
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 1,
              borderColor: colors.primary,
            }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: colors.white,
              width: 35,
              height: 35,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              elevation: 2,
            }}
          >
            <Ionicons name="camera" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text text="Name" preset="semiBold" style={{ fontSize: 16, marginTop: 10 }} />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: colors.lightShade,
              borderRadius: 8,
              paddingHorizontal: 20,
              fontFamily: typography.regular,
              fontSize: 14,
              color: colors.textDark,
            }}
            value={MY_PROFILE_DATA.firstname + " " + MY_PROFILE_DATA.lastname}
          />
          <Text text="Email" preset="semiBold" style={{ fontSize: 16, marginTop: 10 }} />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: colors.lightShade,
              borderRadius: 8,
              paddingHorizontal: 20,
              fontFamily: typography.regular,
              fontSize: 14,
              color: colors.textDark,
            }}
            value={MY_PROFILE_DATA.email}
          />
          <Text text="Password" preset="semiBold" style={{ fontSize: 16, marginTop: 10 }} />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: colors.lightShade,
              borderRadius: 8,
              paddingHorizontal: 20,
              fontFamily: typography.regular,
              fontSize: 14,
              color: colors.textDark,
            }}
            secureTextEntry
            value={MY_PROFILE_DATA.firstname}
          />
          <Text text="Date of Birth" preset="semiBold" style={{ fontSize: 16, marginTop: 10 }} />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: colors.lightShade,
              borderRadius: 8,
              paddingHorizontal: 20,
              fontFamily: typography.regular,
              fontSize: 14,
              color: colors.textDark,
            }}
            value={MY_PROFILE_DATA.dateOfBirth}
          />
          <Text text="Country / Region" preset="semiBold" style={{ fontSize: 16, marginTop: 10 }} />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: colors.lightShade,
              borderRadius: 8,
              paddingHorizontal: 20,
              fontFamily: typography.regular,
              fontSize: 14,
              color: colors.textDark,
            }}
            value={MY_PROFILE_DATA.country}
          />

          <TouchableOpacity
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.primary,
              paddingVertical: 12,
              borderRadius: 8,
            }}
          >
            <Text text="SAVE" style={{ fontFamily: typography.regular, fontSize: 16, color: colors.white }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export { EditProfileScreen };
