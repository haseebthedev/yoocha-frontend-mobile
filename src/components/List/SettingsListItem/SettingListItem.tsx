import { TouchableOpacity } from "react-native";
import { Text } from "components";
import { colors } from "theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

interface ChatCardI {
  iconName: string;
  listText: string;
  iconColor?: string;
  textColor?: string;
  onPress?: () => void;
}

const SettingListItem = ({ iconName, listText, iconColor, textColor, onPress }: ChatCardI) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItem}>
      <Ionicons name={iconName} size={20} color={iconColor ? iconColor : colors.textDim} />
      <Text text={listText} style={[styles.listText, textColor ? { color: textColor } : {}]} />
    </TouchableOpacity>
  );
};

export { SettingListItem };
