import { StyleSheet } from "react-native";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    optionsContainer: {
      position: "absolute",
      top: hp(6.3),
      right: wp(2.5),
      borderWidth: 1,
      borderColor: theme.colors.borderColor,
      borderRadius: hp(1),
      backgroundColor: theme.colors.popupMenuBg,
      elevation: 1,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: hp(2.5),
      paddingVertical: hp(1.8),
    },
    optionText: {
      color: theme.colors.heading,
    },
    optionWithBorder: {
      borderBottomColor: theme.colors.borderColor,
      borderBottomWidth: 1,
    },
    safeAreaStyle: {
      flex: 1,
    },
  });

export default createStyles;
