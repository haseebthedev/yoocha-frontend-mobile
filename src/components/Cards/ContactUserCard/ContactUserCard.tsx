import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "components";
import { UserI } from "store";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import styles from "./styles";

interface ContactUserCardI {
  item: UserI;
  btnTitle: string;
  onViewPress?: () => void;
  onAddBtnPress: () => void;
}

const ContactUserCard = ({ item, btnTitle, onAddBtnPress, onViewPress }: ContactUserCardI) => {
  const username = `${item.firstname} ${item.lastname}`;
  const location = item.country ? item.country : "Unknown";
  const profilePicture = item.profilePicture ? { uri: item.profilePicture } : personPlaceholder;

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onViewPress}>
      <View style={styles.leftContainer}>
        <Image source={profilePicture} style={styles.profileImage} />

        <View>
          <Text preset="semiBold" text={username} numberOfLines={1} />
          <Text text={location} numberOfLines={1} />
        </View>
      </View>

      <TouchableOpacity style={styles.sideBtn} onPress={() => onAddBtnPress()}>
        <Text text={btnTitle} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export { ContactUserCard };
