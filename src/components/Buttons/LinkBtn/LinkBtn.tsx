import { Text } from "components/General/text/text";
import React from "react";
import { TouchableOpacity } from "react-native";
import styles from "./styles";

interface LinkBtnI {
  title?: string;
  onPress?: () => void;
}

const LinkBtn = ({ title, onPress }: LinkBtnI) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.linkText} preset="semiBold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export { LinkBtn };
