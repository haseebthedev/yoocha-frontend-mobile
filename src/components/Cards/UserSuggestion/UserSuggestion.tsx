import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "components";
import { colors } from "theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";

interface UserSuggestionCardI {
  item: any;
  onAddPress?: () => void;
}

const UserSuggestionCard = ({ item, onAddPress }: UserSuggestionCardI) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.profilePic }} style={styles.userProfilePic} />
      <LinearGradient colors={[colors.transparent, colors.black]} style={styles.gradientBlock}></LinearGradient>
      <View style={styles.bottomAbsoluteBlock}>
        <Text text={item.name} preset="bold" style={styles.nameText} numberOfLines={1} />
        <TouchableOpacity onPress={onAddPress} style={styles.addFriendBlock}>
          <Ionicons name="person-add-outline" color={colors.white} size={8} />
          <Text text="Add Friend" style={styles.addFriendText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { UserSuggestionCard };
