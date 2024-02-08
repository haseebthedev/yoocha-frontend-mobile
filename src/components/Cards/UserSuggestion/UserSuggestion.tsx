import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "components";
import { colors } from "theme";
import { SUGGESTED_USER_DATA_I } from "constant";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";

interface UserSuggestionCardI {
  item: SUGGESTED_USER_DATA_I;
  onAddFriendBtnPress?: () => void;
  onViewPress?: () => void;
}

const UserSuggestionCard = ({ item, onAddFriendBtnPress, onViewPress }: UserSuggestionCardI) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onViewPress}>
      <Image source={{ uri: item.profilePic }} style={styles.userProfilePic} />
      <LinearGradient colors={[colors.transparent, colors.black]} style={styles.gradientBlock}></LinearGradient>
      <View style={styles.bottomAbsoluteBlock}>
        <Text text={`${item.firstname} ${item.lastname}`} preset="bold" style={styles.nameText} numberOfLines={1} />
        <TouchableOpacity onPress={onAddFriendBtnPress} style={styles.addFriendBlock}>
          <Ionicons name="person-add-outline" color={colors.white} size={8} />
          <Text text="Add Friend" style={styles.addFriendText} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export { UserSuggestionCard };
