import { StyleProp, TextProps as TextProperties, TextStyle } from "react-native";
// import i18n from "i18n-js"
import { TextPresets } from "./text.presets";
// import { TxKeyPath } from "../../../i18n"

export interface TextProps extends TextProperties {
  children?: React.ReactNode;
  // tx?: TxKeyPath
  // txOptions?: i18n.TranslateOptions
  text?: string | null;
  style?: StyleProp<TextStyle>;
  preset?: TextPresets;
}
