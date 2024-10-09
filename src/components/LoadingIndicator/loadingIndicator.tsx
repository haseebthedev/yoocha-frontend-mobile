import React from "react";
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native";

import { useAppTheme } from "hooks";
import styles from "./styles";

interface LoadingIndicatorI {
  size?: number;
  color?: string;
  containerStyle?: ViewStyle | ViewStyle[];
}

export const LoadingIndicator = ({ color, containerStyle, size }: LoadingIndicatorI) => {
  const { theme } = useAppTheme();

  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <ActivityIndicator color={color ? color : theme.colors.primary} size={size} />
    </View>
  );
};
