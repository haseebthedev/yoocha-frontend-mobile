import { Image, TouchableOpacity, View } from "react-native";

import { Text } from "components";
import { useAppTheme } from "hooks";
import { FriendI, UserI } from "store";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import createStyles from "./styles";

interface ContactUserCardI {
  item: FriendI | UserI;
  btnTitle?: string;
  onViewPress?: () => void;
  onBtnPress: () => void;
}

const ContactUserCard = ({ item, onBtnPress, btnTitle, onViewPress }: ContactUserCardI) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const username = `${item.firstname} ${item.lastname}`;
  const location = item.country ? item.country : "Unknown";
  const profilePicture = item.profilePicture ? { uri: item.profilePicture } : personPlaceholder;

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.leftContainer} onPress={onViewPress} activeOpacity={0.5}>
        <Image source={profilePicture} style={styles.profileImage} />
        <View>
          <Text preset="semiBold" text={username} numberOfLines={1} style={styles.username} />
          <Text text={location} numberOfLines={1} style={styles.location} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sideBtn} onPress={() => onBtnPress()} activeOpacity={0.5}>
        <Text text={btnTitle ? btnTitle : "Add"} style={styles.btnText} />
      </TouchableOpacity>
    </View>
  );
};

export { ContactUserCard };
