import { TouchableOpacity } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

import { Text } from "components";
import { useAppTheme } from "hooks";
import createStyles from "./styles";

interface ChatCardI {
  iconName: string;
  listText: string;
  iconColor?: string;
  textColor?: string;
  onPress?: () => void;
}

const SettingListItem = ({ iconName, listText, iconColor, textColor, onPress }: ChatCardI) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity onPress={onPress} style={styles.listItem}>
      <Ionicons name={iconName} size={20} color={iconColor ? iconColor : theme.colors.iconColor} />
      <Text text={listText} style={[styles.listText, textColor ? { color: textColor } : {}]} />
    </TouchableOpacity>
  );
};

export { SettingListItem };
