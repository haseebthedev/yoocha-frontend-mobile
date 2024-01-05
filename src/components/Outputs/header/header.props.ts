import { ReactNode } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface HeaderProps {
  headerText?: string;
  rightIcon?: string;
  leftIcon?: string;
  onRightPress?(): void;
  onLeftPress?(): void;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<any>;
  titleStyle?: StyleProp<TextStyle>;
  isSticky?: boolean;
  customComponentRight?: ReactNode;
}
