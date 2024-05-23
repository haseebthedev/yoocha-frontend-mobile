import React from "react";
import { View, ViewStyle, TextStyle } from "react-native";
import { Text } from "../text/text";
import styles from "./styles";

interface EmptyListTextI {
  text: string;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

export const EmptyListText = ({ text, textStyle, containerStyle }: EmptyListTextI) => {
  return (
    <View style={[styles.emptyTextContainer, containerStyle]}>
      <Text preset="inputText" style={textStyle}>
        {text}
      </Text>
    </View>
  );
};
