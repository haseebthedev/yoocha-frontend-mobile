import { ReactNode } from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
// import { TxKeyPath } from "../../../i18n"

export interface HeaderProps {
  // headerTx?: TxKeyPath
  headerText?: string
  rightIcon?: string
  leftIcon?: string, 
  onRightPress?(): void,
  onLeftPress?(): void,
  style?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  customComponentRight?: ReactNode
}