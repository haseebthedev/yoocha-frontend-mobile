import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "components";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import styles from "./styles";

interface ChatCardI {
  item: any;
  onPress?: () => void;
}

const ChatCard = ({ item, onPress }: ChatCardI) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.profileContainer}>
        <Image source={personPlaceholder} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text preset="semiBold" text={item.name ? item.name : "Name here"} numberOfLines={1} />
          <Text
            text={item.lastMessage ? item.lastMessage : "Message text here..."}
            numberOfLines={1}
            style={styles.lastMessageText}
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text text={"23/23"} numberOfLines={1} style={styles.infoText} />
        {item.noOfUnReadMessages > 0 && (
          <View style={styles.unreadMessageContainer}>
            <Text text={item.noOfUnReadMessages} style={styles.unreadMessageText} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export { ChatCard };
