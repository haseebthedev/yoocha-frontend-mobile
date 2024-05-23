import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "components";
import { formatDate } from "utils/dateAndTime";
import { colors } from "theme";
import styles from "./styles";
import { RootState, useAppSelector } from "store";

interface NotificationCardI {
  item: any;
  onPress?: () => void;
}

const NotificationCard = ({ item, onPress }: NotificationCardI) => {
  const { darkMode } = useAppSelector((state: RootState) => state.mode);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        item.unReadNotification && { backgroundColor: darkMode ? colors.lightBlack : colors.rgbPrimary },
      ]}
      onPress={onPress}
    >
      <View style={styles.profileContainer}>
        <Image source={{ uri: item.profilePic }} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <View style={styles.nameWithDate}>
            <Text
              preset="semiBold"
              text={item.name}
              numberOfLines={1}
              style={{ color: darkMode ? colors.white : colors.black }}
            />
            <Text
              preset="default"
              style={[styles.time, { color: darkMode ? colors.lightShade : colors.textDim }]}
              text={formatDate(item.notificationDateTime)}
              numberOfLines={1}
            />
          </View>
          <Text
            text={item.notification}
            numberOfLines={1}
            style={[styles.notificationText, { color: darkMode ? colors.lightShade : colors.textDim }]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { NotificationCard };
