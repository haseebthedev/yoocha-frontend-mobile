import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";

interface LoadingIndicatorI {
  size?: number;
  color?: string;
  containerStyle?: ViewStyle | ViewStyle[];
}

export const LoadingIndicator = ({ color, containerStyle, size }: LoadingIndicatorI) => {
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle])}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
