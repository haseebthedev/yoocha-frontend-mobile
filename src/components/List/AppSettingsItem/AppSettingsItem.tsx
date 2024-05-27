import { Switch, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Text } from "components";
import { useAppTheme } from "hooks";
import createStyles from "./styles";

interface AppSettingsItemI {
  iconName: string;
  itemText: string;
  iconColor?: string;
  textColor?: string;
  switchValue: boolean;
  onSwitchChange: () => void;
}

const AppSettingsItem = ({ iconName, itemText, iconColor, switchValue, onSwitchChange }: AppSettingsItemI) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.listContainer}>
      <View style={styles.listItem}>
        <Ionicons name={iconName} size={20} color={iconColor} />
        <Text text={itemText} style={styles.text} />
      </View>
      <Switch
        value={switchValue}
        onValueChange={onSwitchChange}
        thumbColor={theme.colors.thumbColor}
        trackColor={{
          false: theme.colors.trackColor,
          true: theme.colors.trackActiveColor,
        }}
      />
    </View>
  );
};

export { AppSettingsItem };
