import React from "react";
import { View } from "react-native";
import { Text } from "../text/text";
import { ErrorMessageProps } from "./error-message.props";

const ErrorMessage = ({ error, visible }: ErrorMessageProps) => {
  if (!visible || !error) return null;
  return (
    <View>
      <Text text={error} preset="errorLabel" />
    </View>
  );
};

export default ErrorMessage;
