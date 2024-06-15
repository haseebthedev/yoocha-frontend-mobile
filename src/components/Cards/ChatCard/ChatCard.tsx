import { Image, TouchableOpacity, View } from "react-native";

import { Text } from "components";
import { useAppTheme } from "hooks";
import { ListRoomItemI, RootState, useAppSelector } from "store";
import personPlaceholder from "assets/images/personplaceholder.png";
import createStyles from "./styles";

interface ChatCardI {
  item: ListRoomItemI;
  onPress: (friendName: string) => void;
}

const ChatCard = ({ item, onPress }: ChatCardI) => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const friend = item.initiator._id === user?._id ? item.invitee : item.initiator;
  const fullName: string = friend ? `${friend.firstname} ${friend.lastname}` : "Friend Name Here...";
  const profileImage = friend?.profilePicture;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(fullName)} activeOpacity={0.5}>
      <View style={styles.profileContainer}>
        <Image source={profileImage ? { uri: profileImage } : personPlaceholder} style={styles.profileImage} />
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
