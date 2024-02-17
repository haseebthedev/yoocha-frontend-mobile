import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "components";
import { formatDate } from "utils/dateAndTime";
import { colors } from "theme";
import styles from "./styles";

interface NotificationCardI {
  item: any;
  onPress?: () => void;
}

const NotificationCard = ({ item, onPress }: NotificationCardI) => {
  return (
    <TouchableOpacity
      style={[styles.container, item.unReadNotification && { backgroundColor: colors.rgbPrimary }]}
      onPress={onPress}
    >
      <View style={styles.profileContainer}>
        <Image source={{ uri: item.profilePic }} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <View style={styles.nameWithDate}>
            <Text preset="semiBold" text={item.name} numberOfLines={1} />
            <Text preset="light" text={formatDate(item.notificationDateTime)} numberOfLines={1} />
          </View>
          <Text text={item.notification} numberOfLines={1} style={styles.notificationText} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { NotificationCard };
