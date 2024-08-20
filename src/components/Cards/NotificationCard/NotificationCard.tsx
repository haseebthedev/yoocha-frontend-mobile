import { Image, TouchableOpacity, View } from "react-native";

import { Text } from "components";
import { formatDate } from "utils/dateAndTime";
import { capitalize } from "utils/formatString";
import { useAppTheme } from "hooks";
import { NotificationI } from "store/slice/notification/types";
import personPlaceholder from "assets/images/person.png";
import createStyles from "./styles";

interface NotificationCardI {
  item: NotificationI;
  onPress: (id: string) => void;
}

const NotificationCard = ({ item, onPress }: NotificationCardI) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const senderName: string = `${capitalize(item.from.firstname)} ${capitalize(item.from.lastname)}` || "";
  const profileImage: string | null = item?.from.profilePicture;

  return (
    <TouchableOpacity
      style={[styles.container, !item.isRead && { backgroundColor: theme.colors.unReadBg }]}
      onPress={() => onPress(item._id)}
      activeOpacity={0.5}
    >
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={profileImage ? { uri: profileImage } : personPlaceholder}
            style={profileImage ? styles.profileImage : styles.placeholderImage}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.nameWithDate}>
            <Text preset="semiBold" text={senderName} numberOfLines={1} style={styles.name} />
            <Text preset="default" style={styles.time} text={formatDate(item.createdAt)} numberOfLines={1} />
          </View>
          <Text text={item.message} numberOfLines={1} style={styles.notificationText} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { NotificationCard };
