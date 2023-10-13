import { TextStyle } from "react-native";
import { colors, typography } from "theme";
import { hp } from "utils/responsive";

const BASE: TextStyle = {
  fontFamily: typography.regular,
  color: colors.textDark,
  fontSize: hp(1.6),
};

export const presets = {
  default: BASE,

  light: { ...BASE, fontFamily: typography.light } as TextStyle,
  semiBold: { ...BASE, fontFamily: typography.semiBold } as TextStyle,
  bold: { ...BASE, fontFamily: typography.bold } as TextStyle,

  logo:  {...BASE, fontFamily: typography.semiBold, fontSize: hp(2.2), } as TextStyle,
  
  heading:  {...BASE, fontFamily: typography.semiBold, fontSize: hp(1.8), } as TextStyle,
  subheading:  {...BASE, fontFamily: typography.semiBold, fontSize: hp(1.6), } as TextStyle,


  // h1: { ...BASE, fontFamily: typography.bold, fontSize: hp(3.5) } as TextStyle,
  // h2: { ...BASE, fontFamily: typography.bdefaultold, fontSize: hp(3) } as TextStyle,
  // h3: { ...BASE, fontFamily: typography.bold, fontSize: hp(2.5) } as TextStyle,
  // h4: { ...BASE, fontFamily: typography.bold, fontSize: hp(2) } as TextStyle,

  // title: { ...BASE, fontFamily: typography.bold, fontSize: hp(2) } as TextStyle,
  // body: { ...BASE, fontFamily: typography.regular, fontSize: hp(1.8) } as TextStyle,
  // description: { ...BASE, fontFamily: typography.regular, fontSize: hp(1.6) } as TextStyle,
  // link: { ...BASE, fontFamily: typography.regular, fontSize: hp(1.8), textDecorationLine: "underline" } as TextStyle,

  // fieldLabel: { ...BASE, fontFamily: typography.regular, fontSize: hp(1.5) } as TextStyle,
  // errorPlaceholder: { ...BASE, fontFamily: typography.regular, fontSize: hp(1.5), color: colors.error } as TextStyle
};

export type TextPresets = keyof typeof presets;
