import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3563CF",
    bgColor: "#FFFFFF",
    drawerBgColor: "#ffffff",
    iconColor: "#000000",
    heading: "#1A1A1A",
    subHeading: "#5B5B5B",
    placeholderColor: "#191919",
    borderColor: "#F0F0F0",
    outlinedBtnColor: "#CECECE",

    chatScreenBgColor: "#F2F2F2",
    unReadBg: "rgba(53, 99, 207, .1)",
    personImageBg: "#DBDADA",
    popupMenuBg: "#FFFFFF",
    messageCardBg: "#FFFFFF",

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
    drawerBgColor: "#282828",
    iconColor: "#a6a6a6",
    heading: "#E7E7E7",
    subHeading: "#C3C3C3",
    placeholderColor: "#AFAFAF",
    borderColor: "#363535",
    outlinedBtnColor: "#E7E7E7",

    chatScreenBgColor: "#1E1E1E",
    unReadBg: "#3A3A3A",
    popupMenuBg: "#282828",
    personImageBg: "#3a3a3a",
    messageCardBg: "#3A3A3A",

    thumbColor: "#ffffff",
    trackColor: "#a6a6a6",
    trackActiveColor: "#3C75F8",
  },
};
