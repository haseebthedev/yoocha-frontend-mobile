import { FC } from "react";
import { FlatList, View } from "react-native";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Header } from "components";
import { NotificationCard } from "components/Cards/NotificationCard/NotificationCard";
import { NOTIFICATIONS_DATA } from "constant/notifications";
import styles from "./notification.styles";

const NotificationScreen: FC<NativeStackScreenProps<NavigatorParamList, "notifications">> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header headerText="Notifications" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

      <FlatList
        data={NOTIFICATIONS_DATA}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <NotificationCard item={item} onPress={() => {}} />}
        style={styles.notiList}
        contentContainerStyle={styles.notiListContainer}
        ItemSeparatorComponent={() => <View style={styles.notificationDivider} />}
      />
    </View>
  );
};

export { NotificationScreen };
