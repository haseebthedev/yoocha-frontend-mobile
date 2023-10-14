import { FlatList, View } from "react-native";
import { Text, HomeUserStatus, UserSuggestionCard, AppHeading, ChatCard } from "components";
import { HOME_CHAT_DATA, HOME_STATUS_DATA, HOME_SUGGESTION_DATA } from "constant";
import { colors } from "theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./home.styles";
import { hp } from "utils/responsive";
import { NavigatorParamList, navigate } from "navigators";
import { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const HomeScreen: FC<NativeStackScreenProps<NavigatorParamList, "main">> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* App Header */}
      <View style={styles.appHeader}>
        <MaterialCommunityIcons name="menu" color={colors.textDark} size={20} />
        <Text text="YOOCHAT" preset="logo" />
        <Ionicons name="notifications-outline" color={colors.textDark} size={20} />
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.sidebarContainer}>
          <FlatList
            data={HOME_STATUS_DATA}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            style={styles.sidebarList}
            contentContainerStyle={styles.sidebarListContentContainer}
            renderItem={({ item, index }) => <HomeUserStatus key={item.id} item={item} onAddPress={() => {}} />}
          />
        </View>

        <View style={styles.mainBodyContainer}>
          <AppHeading title="Suggestions" rightTitle="View All" />

          <View>
            <FlatList
              horizontal
              data={HOME_SUGGESTION_DATA}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ gap: 8 }}
              renderItem={({ item, index }) => <UserSuggestionCard item={item} />}
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
      </View>
    </View>
  );
};

export { HomeScreen };
