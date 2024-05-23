import { FC } from "react";
import { FlatList, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { NavigatorParamList } from "navigators";
import { NOTIFICATIONS_DATA } from "constant/notifications";
import { Header, NotificationCard } from "components";
import { RootState, useAppSelector } from "store";
import styles from "./notification.styles";
import { colors } from "theme";

const NotificationScreen: FC<NativeStackScreenProps<NavigatorParamList, "notifications">> = ({ navigation }) => {
  const { darkMode } = useAppSelector((state: RootState) => state.mode);

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? colors.black : colors.white }]}>
      <Header
        headerText="Notifications"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
        titleStyle={{ color: darkMode ? colors.white : colors.black }}
      />

      <FlatList
        data={NOTIFICATIONS_DATA}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <NotificationCard item={item} onPress={() => {}} />}
        style={styles.notiList}
        contentContainerStyle={styles.notiListContainer}
      />
    </View>
  );
};

export { NotificationScreen };
