import React from "react";
import { View } from "react-native";
import styles from "./styles";

export const Divider = () => {
  return (
    <View style={styles.spacing}>
      <View style={styles.divider} />
    </View>
  );
};
