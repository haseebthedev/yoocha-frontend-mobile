import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "components";
import styles from "./styles";

interface ContactUserCardI {
  item: any;
  btnTitle: string;
  onBtnPress: () => void;
}

const ContactUserCard = ({ item, btnTitle, onBtnPress }: ContactUserCardI) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.leftContainer}>
        <Image source={{ uri: item.profilePic }} style={styles.profileImage} />

        <View>
          <Text preset="semiBold" text={item.name} numberOfLines={1} />
          <Text text={item.country} numberOfLines={1} />
        </View>
      </View>

      <TouchableOpacity style={styles.sideBtn} onPress={onBtnPress}>
        <Text text={btnTitle} />
      </TouchableOpacity>
    </View>
  );
};

export { ContactUserCard };
