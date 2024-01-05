import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "components";
import { colors } from "theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { SUGGESTED_USER_DATA_I } from "constant";

interface UserSuggestionCardI {
  item: SUGGESTED_USER_DATA_I;
  onViewPress: () => void;
  onAddPress?: () => void;
}

const AddUserSuggestionCard = ({ item, onViewPress, onAddPress }: UserSuggestionCardI) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onViewPress}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image source={{ uri: item.profilePic }} style={styles.profilePic} />

        <View>
          <Text preset="semiBold" text={`${item.firstname} ${item.lastname}`} numberOfLines={1} />
          <Text text={`${item.city}, ${item.country}`} numberOfLines={1} />
        </View>
      </View>

      <TouchableOpacity onPress={onAddPress} style={styles.addFriendBlock}>
        <Ionicons name="person-add-outline" color={colors.white} size={15} />
        <Text text="Add Friend" style={styles.addFriendText} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export { AddUserSuggestionCard };
