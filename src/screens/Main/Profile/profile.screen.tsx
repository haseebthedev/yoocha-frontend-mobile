import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParamList } from "navigators";
import { colors, typography } from "theme";
import { Text } from "components";
import { hp, wp } from "utils/responsive";
import { MY_PROFILE_DATA } from "constant";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./profile.styles";

const ProfileScreen: FC<NativeStackScreenProps<NavigatorParamList, "profile">> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* App Header */}
      <View style={styles.appHeader}>
        <MaterialCommunityIcons name="menu" color={colors.white} size={24} />
        <Text text="YOOCHAT" preset="logo" style={{ color: colors.white }} />

        <TouchableOpacity onPress={() => navigation.navigate("settings")}>
          <Ionicons name="settings-outline" color={colors.white} size={24} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          marginTop: hp(16),
          flex: 1,
          backgroundColor: colors.white,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            flexDirection: "column",
            alignItems: "center",
            top: -60,
            left: 0,
            right: 0,
          }}
        >
          <Image
            source={{ uri: MY_PROFILE_DATA.profilePic }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 4,
              borderColor: colors.white,
            }}
          />
          <Text
            text={MY_PROFILE_DATA.firstname + " " + MY_PROFILE_DATA.lastname}
            preset="heading"
            style={{ fontSize: 18, marginTop: 10 }}
          />

          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 }}>
            <Ionicons name="location-sharp" size={18} color={colors.textDark} />
            <Text text={MY_PROFILE_DATA.city + ", " + MY_PROFILE_DATA.country} preset="light" />
          </View>
        </View>

        <View
          style={{
            marginTop: hp(20),
            paddingHorizontal: wp(5),
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text
              text={String(MY_PROFILE_DATA.friends)}
              style={{ fontSize: 24, fontFamily: typography.semiBold, color: colors.primary }}
            />
            <Text text="Friends" style={{ fontFamily: typography.light, fontSize: 14 }} />
          </View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text
              text={String(MY_PROFILE_DATA.pending)}
              style={{ fontSize: 24, fontFamily: typography.semiBold, color: colors.primary }}
            />
            <Text text="Pending" style={{ fontFamily: typography.light, fontSize: 14 }} />
          </View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text
              text={String(MY_PROFILE_DATA.blocked)}
              style={{ fontSize: 24, fontFamily: typography.semiBold, color: colors.primary }}
            />
            <Text text="Blocked" style={{ fontFamily: typography.light, fontSize: 14 }} />
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30, gap: 10, justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("editprofile")}
            style={{ backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 6, borderRadius: 6 }}
          >
            <Text text="Edit Profile" style={{ color: colors.white }} />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 30, paddingHorizontal: wp(5), position: "absolute", bottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 50 }}>
            <Text
              text="Photos"
              style={{ textAlign: "center", fontFamily: typography.semiBold, fontSize: 12, color: colors.primary }}
            />
            <Text
              text="Likes"
              style={{ textAlign: "center", fontFamily: typography.semiBold, fontSize: 12, color: colors.grey }}
            />
          </View>
          <View style={{ width: "100%", height: 1, backgroundColor: colors.lightShade, marginVertical: 10 }} />

          <FlatList
            horizontal={true}
            data={MY_PROFILE_DATA.myPosts}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item }) => (
              <View>
                <Image source={{ uri: item.media }} style={{ width: wp(28), height: hp(20), borderRadius: 12 }} />
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export { ProfileScreen };
