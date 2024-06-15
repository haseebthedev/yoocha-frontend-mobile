import { StyleSheet } from "react-native";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: hp(2),
      backgroundColor: theme.colors.bgColor,
    },
    form: {
      paddingHorizontal: wp(5),
      marginTop: hp(2),
    },
    appHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: wp(5),
      paddingVertical: hp(2),
    },
  });

export default createStyles;
