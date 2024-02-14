import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "components";
import { colors } from "theme";
import { hp } from "utils/responsive";
import { HOME_STATUS_DATA_I } from "constant";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

interface HomeUserStatusI {
  item: HOME_STATUS_DATA_I;
  onAddPress?: () => void;
  onViewPress?: () => void;
}

const HomeUserStatus = ({ item, onAddPress, onViewPress }: HomeUserStatusI) => {
  return (
    <TouchableOpacity onPress={onViewPress} style={styles.container}>
      <View style={styles.imageOuterBlock}>
        <Image source={{ uri: item.profilePic }} style={styles.imgBlock} />
        {item.id === "0" && onAddPress && (
          <TouchableOpacity onPress={onAddPress} style={styles.addBtnContainer}>
            <Ionicons name="add" color={colors.white} size={hp(1.5)} />
          </TouchableOpacity>
        )}
      </View>
      <Text preset="semiBold" text={item.name} style={styles.nameText} />
    </TouchableOpacity>
  );
};

export { HomeUserStatus };
