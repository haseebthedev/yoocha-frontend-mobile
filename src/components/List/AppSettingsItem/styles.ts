import { StyleSheet } from "react-native";
import { typography } from "theme";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    listContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: hp(2),
    },
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: wp(3.5),
    },
    text: {
      fontFamily: typography.regular,
      fontSize: 16,
      marginTop: hp(0.35),
      color: theme.colors.heading,
    },
  });

export default createStyles;
