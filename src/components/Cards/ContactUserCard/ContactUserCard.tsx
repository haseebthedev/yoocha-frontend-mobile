import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "components";
import { FriendI, UserI, useAppSelector, RootState } from "store";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import styles from "./styles";
import { colors } from "theme";

interface ContactUserCardI {
  item: FriendI;
  btnTitle?: string;
  onViewPress?: () => void;
  onAddBtnPress: () => void;
}

const ContactUserCard = ({ item, onAddBtnPress, btnTitle, onViewPress }: ContactUserCardI) => {
  const { darkMode } = useAppSelector((state: RootState) => state.mode);
  const headingColor: string = darkMode ? colors.white : colors.black;
  const subHeadingColor: string = darkMode ? colors.lightShade : colors.textDim;

  const username = `${item.firstname} ${item.lastname}`;
  const location = item.country ? item.country : "Unknown";
  const profilePicture = item.profilePicture ? { uri: item.profilePicture } : personPlaceholder;

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onViewPress}>
      <View style={styles.leftContainer}>
        <Image source={profilePicture} style={styles.profileImage} />

        <View>
          <Text preset="semiBold" text={username} numberOfLines={1} style={{ color: headingColor }} />
          <Text text={location} numberOfLines={1} style={{ color: subHeadingColor }} />
        </View>
      </View>

      <TouchableOpacity style={styles.sideBtn} onPress={() => onAddBtnPress()}>
        <Text text={btnTitle ? btnTitle : "Add"} style={{ color: darkMode ? colors.lightShade : colors.textDim }} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export { ContactUserCard };
