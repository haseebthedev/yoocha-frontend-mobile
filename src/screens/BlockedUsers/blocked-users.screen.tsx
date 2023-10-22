import { FC } from "react";
import { Text } from "components";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { hp, wp } from "utils/responsive";
import { colors } from "theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./blocked-users.styles";
import { BLOCKED_CONTACTS_DATA } from "constant";

const BlockedUsersScreen: FC<NativeStackScreenProps<NavigatorParamList, "blockedusers">> = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      {/* App Header */}
      <View style={styles.appHeader}>
        <Ionicons name="chevron-back" color={colors.white} size={24} />
        <Text text="Blocked Users" preset="logo" style={{ color: colors.white }} />
        <MaterialCommunityIcons name="menu" color={colors.primary} size={24} />
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
        <Text text="Block users list" style={{ color: colors.textDim, fontSize: 14, marginBottom: 20 }} />

        <FlatList
          data={BLOCKED_CONTACTS_DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
                paddingBottom: 15,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Image
                  source={{ uri: item.profilePic }}
                  style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: colors.grey }}
                />

                <View>
                  <Text preset="semiBold" text={item.name} numberOfLines={1} />
                  <Text text={item.country} numberOfLines={1} />
                </View>
              </View>

              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "#EBEBEB",
                  borderRadius: 8,
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                }}
              >
                <Text text="Unblock" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export { BlockedUsersScreen };
