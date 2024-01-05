import { StyleProp, TextStyle, TextInputAndroidProps } from "react-native";
import { TextProps } from "../text/text.props";
import { ComponentType } from "react";

export interface TextInputProps extends TextInputAndroidProps {
  value?: string;
  style?: StyleProp<TextStyle>;
  label?: TextProps["text"];
  placeholder?: TextProps["text"];
  rightIcon?: string;
  isPassword?: boolean;
  error?: any;
  visible?: any;
  multiline?: any;
  onBlur?: () => void;
  onRightPress?: () => void;
  onChangeText?: (text: string) => void;
}
