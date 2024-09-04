import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: hp(2.5),
      backgroundColor: theme.colors.bgColor,
      paddingHorizontal: wp(5),
    },
    form: {
      flex: 1,
      marginTop: hp(6),
    },
    forgetPassword: {
      marginVertical: hp(2),
    },
    forgetPasswordText: {
      textAlign: "center",
      color: theme.colors.heading,
    },
    dontHaveAccText: {
      textAlign: "center",
      color: theme.colors.heading,
    },
    dontHaveAccContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
    submitButton: {
      marginTop: hp(2),
    },
  });

export default createStyles;
