import { StyleProp, TextStyle, TextInputAndroidProps } from "react-native";
import { TextProps } from "../text/text.props";

export interface TextInputProps extends TextInputAndroidProps {
  value?: string;
  style?: StyleProp<TextStyle>;
  label?: TextProps["text"];
  placeholder?: TextProps["text"];
  rightIcon?: string;
  isPassword?: boolean;
  error?: string | undefined | string[] | any;
  visible?: boolean | any;
  multiline?: boolean;
  isEditable?: boolean;
  onBlur?: () => void;
  onRightPress?: () => void;
  onChangeText?: (text: string) => void;
}
