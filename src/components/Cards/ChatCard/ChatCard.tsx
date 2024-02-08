import { Image, TouchableOpacity, View } from "react-native";
import { ListRoomItemI } from "interfaces";
import { Text } from "components";
import { RootState, useAppSelector } from "store";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import styles from "./styles";
import { navigationRef } from "navigators";

interface ChatCardI {
  item: ListRoomItemI;
  onPress: (friendName: string) => void
}

const ChatCard = ({ item, onPress }: ChatCardI) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const friend = item.participants.find(participant => participant.user?._id !== user?._id);
  const fullName: string = friend?.user ? `${friend.user.firstname} ${friend.user.lastname}` : '';

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(fullName)}>
      <View style={styles.profileContainer}>
        <Image source={personPlaceholder} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text preset="semiBold" text={fullName} numberOfLines={1} />
          <Text text={"Last Message text here..."} numberOfLines={1} style={styles.lastMessageText} />
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
