import { Image, TouchableOpacity, View } from "react-native";

import { Text } from "components";
import { capitalize } from "utils/formatString";
import { useAppTheme } from "hooks";
import { ListRoomItemI, RootState, useAppSelector } from "store";
import personPlaceholder from "assets/images/person.png";
import createStyles from "./styles";

interface ChatCardI {
  item: ListRoomItemI;
  onPress: () => void;
}

const ChatCard = ({ item, onPress }: ChatCardI) => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const friend = item.initiator._id === user?._id ? item.invitee : item.initiator;
  const fullName: string = friend
    ? `${capitalize(friend.firstname || "Guest")} ${capitalize(friend.lastname || "")}`
    : "Friend Name Here...";
  const profileImage = friend?.profilePicture;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.5}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            source={profileImage ? { uri: profileImage } : personPlaceholder}
            style={profileImage ? styles.profileImage : styles.placeholderImage}
          />
        </View>
        <View style={styles.textContainer}>
          <Text preset="semiBold" text={fullName} numberOfLines={1} style={styles.name} />
          <Text
            text={item?.lastMessage ? item.lastMessage : "Start a conversation!"}
            numberOfLines={1}
            style={styles.lastMessageText}
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text text={"23/23"} numberOfLines={1} style={styles.infoText} />
        {/* {item.noOfUnReadMessages > 0 && (
          <View style={styles.unreadMessageContainer}>
            <Text text={item.noOfUnReadMessages} style={styles.unreadMessageText} />
          </View>
        )} */}
      </View>
    </TouchableOpacity>
  );
};

export { ChatCard };
