import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3563CF",
    bgColor: "#FFFFFF",
    chatScreenBgColor: "#F2F2F2",
    drawerBgColor: "#ffffff",
    iconColor: "#000000",
    heading: "#1A1A1A",
    subHeading: "#5B5B5B",
    placeholderColor: "#191919",
    unReadBg: "rgba(53, 99, 207, .1)",
    borderColor: "#F0F0F0",
    popupMenuBg: "#FFFFFF",

    messageCardBg: "#FFFFFF",

    outlinedBtnColor: "#CECECE",
    thumbColor: "#ffffff",
    trackColor: "#D5D5D5",
    trackActiveColor: "#3C75F8",
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#3563CF",
    bgColor: "#1E1E1E",
    chatScreenBgColor: "#1E1E1E",
    drawerBgColor: "#282828",
    iconColor: "#a6a6a6",
    heading: "#E7E7E7",
    subHeading: "#C3C3C3",
    placeholderColor: "#AFAFAF",
    unReadBg: "#3A3A3A",
    borderColor: "#363535",
    popupMenuBg: "#282828",

    messageCardBg: "#3A3A3A",

    outlinedBtnColor: "#E7E7E7",
    thumbColor: "#ffffff",
    trackColor: "#E2E2E2",
    trackActiveColor: "#3C75F8",
  },
};
