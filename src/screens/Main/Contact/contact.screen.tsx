import { FC, useState } from "react";
import { FlatList, Image, TextInput, TouchableOpacity, View } from "react-native";
import { AlertBox, Text } from "components";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors, typography } from "theme";
import { hp, wp } from "utils/responsive";
import { CONTACTS_DATA, PENDING_CONTACTS_DATA } from "constant";
import styles from "./contact.styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ContactScreen: FC<NativeStackScreenProps<NavigatorParamList, "contacts">> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<string>("contacts");
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);

  const onCloseAlertBoxPress = () => {
    setAlertModalVisible((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* App Header */}
      <View style={styles.appHeader}>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" color={colors.textDark} size={24} />
        </TouchableOpacity>
        <Text text="YOOCHAT" preset="logo" />
        <TouchableOpacity onPress={() => navigation.navigate("blockedusers")}>
          <Ionicons name="ellipsis-vertical-sharp" color={colors.textDark} size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.topHeaderBlock}>
        <TouchableOpacity
          onPress={() => setActiveTab("contacts")}
          style={[styles.menuContainer, activeTab === "contacts" && styles.selectedMenuStyles]}
        >
          <Text
            text="Contacts"
            preset="semiBold"
            style={[styles.menuText, activeTab === "contacts" && styles.selectedMenuText]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("pending")}
          style={[styles.menuContainer, activeTab === "pending" && styles.selectedMenuStyles]}
        >
          <Text
            text="Pending"
            preset="semiBold"
            style={[styles.menuText, activeTab === "pending" && styles.selectedMenuText]}
          />
        </TouchableOpacity>
      </View>

      {activeTab === "contacts" && (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              marginHorizontal: wp(5),
              borderWidth: 1,
              borderColor: "#EBEBEB",
              borderRadius: 8,
              paddingHorizontal: 12,
            }}
          >
            <Ionicons name="search-outline" size={20} />
            <TextInput
              placeholder="Search"
              style={{ flex: 1, paddingHorizontal: 10, fontFamily: typography.regular, marginBottom: -5 }}
            />
          </View>

          <FlatList
            data={CONTACTS_DATA}
            keyExtractor={(item) => item.id}
            style={{ marginTop: hp(2) }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                  paddingHorizontal: wp(5),
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
                  <Text text="Add" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      {activeTab === "pending" && (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              marginHorizontal: wp(5),
              borderWidth: 1,
              borderColor: "#EBEBEB",
              borderRadius: 8,
              paddingHorizontal: 12,
            }}
          >
            <Ionicons name="search-outline" size={20} />
            <TextInput
              placeholder="Search"
              style={{ flex: 1, paddingHorizontal: 10, fontFamily: typography.regular, marginBottom: -5 }}
            />
          </View>

          <FlatList
            data={PENDING_CONTACTS_DATA}
            keyExtractor={(item) => item.id}
            style={{ marginTop: hp(2) }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                  paddingHorizontal: wp(5),
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
                  <Text text="Pending" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      <AlertBox
        open={alertModalVisible}
        title="Cancel Request!"
        description="Are you sure you want to cancel request?"
        onClose={onCloseAlertBoxPress}
        secondaryButtonText="Cancel"
        primaryButtonText="Remove"
        secondaryOnClick={() => setAlertModalVisible((prev) => !prev)}
      />
    </View>
  );
};

export { ContactScreen };
