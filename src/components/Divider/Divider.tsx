import React from "react";
import { View, ViewStyle } from "react-native";
import createStyles from "./styles";
import { useAppTheme } from "hooks";

interface DividerProps {
  spacingStyle?: ViewStyle;
  dividerStyle?: ViewStyle;
}

export const Divider = ({ spacingStyle, dividerStyle }: DividerProps) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.spacing, spacingStyle]}>
      <View style={[styles.divider, dividerStyle]} />
    </View>
  );
};
