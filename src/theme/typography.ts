import { Platform } from "react-native";

const typography = {
  light: Platform.select({
    ios: "Poppins-Light",
    android: "Poppins-Light",
  }),
  regular: Platform.select({
    ios: "Poppins-Regular",
    android: "Poppins-Regular",
  }),
  semiBold: Platform.select({
    ios: "Poppins-SemiBold",
    android: "Poppins-SemiBold",
  }),
  bold: Platform.select({
    ios: "Poppins-Bold",
    android: "Poppins-Bold",
  }),
};

export { typography };
