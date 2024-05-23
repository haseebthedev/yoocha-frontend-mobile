import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "components";
import { ListRoomItemI, RootState, useAppSelector } from "store";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import styles from "./styles";
import { colors } from "theme";

interface ChatCardI {
  item: ListRoomItemI;
  onPress: (friendName: string) => void;
}

const ChatCard = ({ item, onPress }: ChatCardI) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { darkMode } = useAppSelector((state: RootState) => state.mode);

  const friend = item.initiator._id === user?._id ? item.invitee : item.initiator;
  const fullName: string = friend ? `${friend.firstname} ${friend.lastname}` : "Friend Name Here...";
  const profileImage = friend?.profilePicture;

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(fullName)}>
      <View style={styles.profileContainer}>
        <Image source={profileImage ? { uri: profileImage } : personPlaceholder} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text
            preset="semiBold"
            text={fullName}
            numberOfLines={1}
            style={{ color: darkMode ? colors.white : colors.black }}
          />
          <Text
            text={item?.lastMessage && item.lastMessage}
            numberOfLines={1}
            style={darkMode ? styles.lastMessageTextLight : styles.lastMessageTextDark}
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text text={"23/23"} numberOfLines={1} style={darkMode ? styles.infoTextLight : styles.infoTextDark} />
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
