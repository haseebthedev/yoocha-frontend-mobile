import { Switch, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Text } from "components";
import { colors } from "theme";
import { RootState, useAppSelector } from "store";
import styles from "./styles";

interface AppSettingsItemI {
  iconName: string;
  itemText: string;
  iconColor?: string;
  textColor?: string;
  switchValue: boolean;
  onSwitchChange: () => void;
}

const AppSettingsItem = ({
  iconName,
  itemText,
  iconColor,
  textColor,
  switchValue,
  onSwitchChange,
}: AppSettingsItemI) => {
  const { darkMode } = useAppSelector((state: RootState) => state.mode);

  return (
    <View style={styles.listContainer}>
      <View style={styles.listItem}>
        <Ionicons name={iconName} size={20} color={iconColor} />
        <Text text={itemText} style={[styles.text, { color: textColor }]} />
      </View>
      <Switch
        value={switchValue}
        onValueChange={onSwitchChange}
        thumbColor={darkMode ? colors.white : colors.primary}
        trackColor={{
          false: darkMode ? colors.lightShade : colors.lightPrimary,
          true: darkMode ? colors.primary : colors.lightPrimary,
        }}
      />
    </View>
  );
};

export { AppSettingsItem };
