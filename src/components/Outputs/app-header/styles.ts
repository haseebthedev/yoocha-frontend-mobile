import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: hp(1.6),
    },
    rightText: {
      color: colors.primary,
    },
    headingText: {
      color: theme.colors.heading,
    },
  });

export default createStyles;
