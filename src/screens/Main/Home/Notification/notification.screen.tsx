import { FC } from "react";
import { FlatList, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useAppTheme } from "hooks";
import { NavigatorParamList } from "navigators";
import { NOTIFICATIONS_DATA } from "constant/notifications";
import { Header, NotificationCard } from "components";
import createStyles from "./notification.styles";

const NotificationScreen: FC<NativeStackScreenProps<NavigatorParamList, "notifications">> = ({ navigation }) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Header
        headerText="Notifications"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
        titleStyle={{ color: theme.colors.heading }}
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
