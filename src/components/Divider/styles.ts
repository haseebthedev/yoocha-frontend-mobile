import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    spacing: {
      paddingVertical: hp(1.5),
    },
    divider: {
      width: "100%",
      height: 1,
      backgroundColor: theme.colors.borderColor,
    },
  });

export default createStyles;
