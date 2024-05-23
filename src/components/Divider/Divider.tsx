import React from "react";
import { View, ViewStyle } from "react-native";
import styles from "./styles";

interface DividerProps {
  spacingStyle?: ViewStyle;
  dividerStyle?: ViewStyle;
}

export const Divider = ({ spacingStyle, dividerStyle }: DividerProps) => {
  return (
    <View style={[styles.spacing, spacingStyle]}>
      <View style={[styles.divider, dividerStyle]} />
    </View>
  );
};
