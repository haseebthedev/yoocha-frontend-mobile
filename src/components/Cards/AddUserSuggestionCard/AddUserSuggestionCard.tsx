import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "components";
import { colors } from "theme";
import { UserI } from "store";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

interface UserSuggestionCardI {
  item: UserI;
  onViewPress: () => void;
  onAddFriendBtnPress: (id: string) => void;
}

const AddUserSuggestionCard = ({ item, onViewPress, onAddFriendBtnPress }: UserSuggestionCardI) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onViewPress}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          source={item.profilePicture ? { uri: item.profilePicture } : personPlaceholder}
          style={styles.profilePic}
        />

        <View>
          <Text preset="semiBold" text={`${item.firstname} ${item.lastname}`} numberOfLines={1} />
          <Text text={`City, Country`} numberOfLines={1} />
        </View>
      </View>

      <TouchableOpacity onPress={() => onAddFriendBtnPress(item?._id)} style={styles.addFriendBlock}>
        <Ionicons name="person-add-outline" color={colors.white} size={15} />
        <Text text="Add Friend" style={styles.addFriendText} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export { AddUserSuggestionCard };
