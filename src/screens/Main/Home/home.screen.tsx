import { FC, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, HomeUserStatus, UserSuggestionCard, AppHeading, ChatCard, StatusModal } from "components";
import { HOME_CHAT_DATA, HOME_STATUS_DATA, HOME_SUGGESTION_DATA } from "constant";
import { hp } from "utils/responsive";
import { colors } from "theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./home.styles";

export interface UserStatusI {
  id: string;
  name: string;
  profilePic: string;
  date: string;
  statusImage: string;
}

const HomeScreen: FC<NativeStackScreenProps<NavigatorParamList, "home">> = ({ navigation }) => {
  const [viewStatus, setViewStatus] = useState<boolean>(false);
  const [statusData, setStatusData] = useState<UserStatusI>({
    id: "",
    name: "",
    profilePic: "",
    date: "",
    statusImage: "",
  });

  const onViewPress = (selectedItem: UserStatusI) => {
    setStatusData(selectedItem);
    setViewStatus((prev) => !prev);
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
        <TouchableOpacity onPress={() => navigation.navigate("notifications")}>
          <Ionicons name="notifications-outline" color={colors.textDark} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.sidebarContainer}>
          <FlatList
            data={HOME_STATUS_DATA}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            style={styles.sidebarList}
            contentContainerStyle={styles.sidebarListContentContainer}
            renderItem={({ item, index }) => (
              <HomeUserStatus key={item.id} item={item} onViewPress={() => onViewPress(item)} onAddPress={() => {}} />
            )}
          />
        </View>

        <View style={styles.mainBodyContainer}>
          <AppHeading
            title="Suggestions"
            rightTitle="View All"
            onRightPress={() => navigation.navigate("suggestions")}
          />

          <View>
            <FlatList
              horizontal
              data={HOME_SUGGESTION_DATA}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ gap: 8 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <UserSuggestionCard item={item} onViewPress={() => navigation.navigate("publicProfile", { item })} />
              )}
            />
          </View>

          <AppHeading title="Friends" />
          <FlatList
            data={HOME_CHAT_DATA}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ChatCard item={item} onPress={() => navigation.navigate("usermessaging")} />}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 20 }}
            ItemSeparatorComponent={() => (
              <View style={{ paddingVertical: hp(1.2) }}>
                <View style={{ width: "100%", height: 1, backgroundColor: colors.lightShade }} />
              </View>
            )}
          />
        </View>

        {viewStatus && (
          <StatusModal
            isVisible={viewStatus}
            selectedItem={statusData}
            title="Sara Khan"
            onPressClose={() => setViewStatus(false)}
          />
        )}
      </View>
    </View>
  );
};

export { HomeScreen };
