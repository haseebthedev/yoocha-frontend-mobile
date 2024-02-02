import { Text } from "components/General/text/text";
import React from "react";
import { ButtonProps, TouchableOpacity } from "react-native";
import styles from "./styles";

interface LinkBtnI extends ButtonProps {
  title: string;
  onPress?: () => void;
}

const LinkBtn = ({ title, onPress, ...rest }: LinkBtnI) => {
  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <Text style={styles.linkText} preset="semiBold">
        {title ? title : "Some Text here..."}
      </Text>
    </TouchableOpacity>
  );
};

export { LinkBtn };
