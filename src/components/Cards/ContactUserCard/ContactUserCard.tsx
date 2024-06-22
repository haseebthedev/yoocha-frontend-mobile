import { Image, TouchableOpacity, View } from "react-native";

import { Text } from "components";
import { useAppTheme } from "hooks";
import { UserI } from "store";
import person from "assets/images/person.png";
import createStyles from "./styles";

interface ContactUserCardI {
  item: UserI;
  btnTitle?: string;
  onViewPress?: () => void;
  onBtnPress: (id: string, isFriendReqSent?: boolean) => void;
}

const ContactUserCard = ({ item, onBtnPress, btnTitle, onViewPress }: ContactUserCardI) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const username = `${item.firstname} ${item.lastname}`;
  const location = item.country ? item.country : "Unknown";
  const profilePicture = item.profilePicture ? { uri: item.profilePicture } : person;

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.leftContainer} onPress={onViewPress} activeOpacity={0.5}>
        <View style={styles.profileImageContainer}>
          <Image source={profilePicture} style={item.profilePicture ? styles.profileImage : styles.placeholderImage} />
        </View>
        <View>
          <Text preset="semiBold" text={username} numberOfLines={1} style={styles.username} />
          <Text text={location} numberOfLines={1} style={styles.location} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => onBtnPress(item._id, item.isFriendReqSent)}
        style={styles.sideBtn}
      >
        <Text text={btnTitle ? btnTitle : "Add"} style={styles.btnText} />
      </TouchableOpacity>
    </View>
  );
};

export { ContactUserCard };
