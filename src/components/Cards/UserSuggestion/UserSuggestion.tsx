import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "components";
import { UserI } from "store";
import { colors } from "theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import styles from "./styles";

interface UserSuggestionCardI {
  item: UserI;
  btnTitle: string;
  onAddFriendBtnPress: (id: string) => void;
  onViewPress?: () => void;
}

const UserSuggestionCard = ({ item, btnTitle, onAddFriendBtnPress, onViewPress }: UserSuggestionCardI) => {
  const fullname: string = `${item.firstname} ${item.lastname}`;

  return (
    <TouchableOpacity style={styles.container} onPress={onViewPress} activeOpacity={0.7}>
      <Image
        source={item?.profilePicture ? { uri: item?.profilePicture } : personPlaceholder}
        style={styles.userProfilePic}
      />
      <LinearGradient colors={[colors.transparent, colors.black]} style={styles.gradientBlock}></LinearGradient>
      <View style={styles.bottomAbsoluteBlock}>
        <Text text={fullname} preset="semiBold" style={styles.nameText} numberOfLines={1} />
        <TouchableOpacity
          onPress={() => onAddFriendBtnPress(item?._id)}
          style={styles.addFriendBlock}
          activeOpacity={0.7}
        >
          <Ionicons name="person-add-outline" color={colors.white} size={8} />
          <Text text={btnTitle} style={styles.addFriendText} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export { UserSuggestionCard };
