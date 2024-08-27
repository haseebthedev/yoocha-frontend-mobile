import { Image, ImageSourcePropType, TouchableOpacity, View } from "react-native";

import { Text } from "components";
import { capitalize } from "utils/formatString";
import { useAppTheme } from "hooks";
import { ListRoomItemI, RootState, useAppSelector, UserI } from "store";
import personPlaceholder from "assets/images/person.png";

import createStyles from "./styles";

interface ChatCardI {
  item: ListRoomItemI;
  onPress: () => void;
}

const ChatCard = ({ item, onPress }: ChatCardI) => {
  const { lastMessage, initiator, invitee } = item;
  const { user } = useAppSelector((state: RootState) => state.auth);

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const friend: UserI = initiator._id === user?._id ? invitee : initiator;

  const fullName: string = friend
    ? `${capitalize(friend.firstname || "Guest")} ${capitalize(friend.lastname || "")}`
    : "User";

  const profileImage: ImageSourcePropType = friend?.profilePicture
    ? { uri: friend?.profilePicture }
    : personPlaceholder;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.5}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image source={profileImage} style={friend?.profilePicture ? styles.profileImage : styles.placeholderImage} />
        </View>
        <View style={styles.textContainer}>
          <Text preset="semiBold" text={fullName} numberOfLines={1} style={styles.name} />
          <Text
            text={lastMessage ? lastMessage : "Start a conversation!"}
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
