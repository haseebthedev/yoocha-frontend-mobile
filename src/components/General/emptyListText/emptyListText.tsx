import React from "react";
import { View } from "react-native";
import { Text } from "../text/text";
import styles from "./styles";

interface EmptyListTextI {
  text: string;
}

export const EmptyListText = ({ text }: EmptyListTextI) => {
  return (
    <View style={styles.emptyTextContainer}>
      <Text preset="inputText">{text}</Text>
    </View>
  );
};
