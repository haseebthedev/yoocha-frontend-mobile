import React, { ReactNode } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "components";
import styles from "./styles";
import { useAppSelector, RootState } from "store";
import { colors } from "theme";

interface AppHeadingI {
  title: string;
  rightTitle?: ReactNode;
  onRightPress?: () => void;
}

const AppHeading: React.FC<AppHeadingI> = ({ title, rightTitle, onRightPress }) => {
  const { darkMode } = useAppSelector((state: RootState) => state.mode);
  const titleColor: string = darkMode ? colors.lightShade : colors.textDim;

  return (
    <View style={styles.container}>
      <Text text={title} preset="heading" style={{ color: titleColor }} />
      {rightTitle && (
        <TouchableOpacity onPress={onRightPress}>
          <Text text="View All" preset="semiBold" style={styles.rightText} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export { AppHeading };
