import { FC, useState } from "react";
import { AlertBox, Header, Text } from "components";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { hp, wp } from "utils/responsive";
import { colors } from "theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { BLOCKED_CONTACTS_DATA } from "constant";
import styles from "./blocked-users.styles";

const BlockedUsersScreen: FC<NativeStackScreenProps<NavigatorParamList, "blockedusers">> = ({ navigation, route }) => {
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);

  const onCloseAlertBoxPress = () => {
    setAlertModalVisible((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* App Header */}
      <Header
        headerText="Blocked Users"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
        titleStyle={{ color: colors.white }}
        iconStyle={colors.white}
      />

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
                onPress={() => setAlertModalVisible((prev) => !prev)}
              >
                <Text text="Unblock" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <AlertBox
        open={alertModalVisible}
        title="Unblock!"
        description="Are you sure you want to unblock."
        onClose={onCloseAlertBoxPress}
        secondaryButtonText="Cancel"
        primaryButtonText="Unblock"
        secondaryOnClick={() => setAlertModalVisible((prev) => !prev)}
      />
    </View>
  );
};

export { BlockedUsersScreen };
