import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: hp(2.5),
      backgroundColor: theme.colors.bgColor,
    },
    form: {
      flex: 1,
      paddingHorizontal: wp(5),
      marginTop: hp(3),
    },
    input: {
      marginVertical: hp(1),
      borderColor: colors.grey,
      borderWidth: 1,
      borderRadius: hp(1),
      paddingHorizontal: wp(4),
    },
    forgetPassword: {
      marginVertical: hp(4),
    },
    forgetPasswordText: {
      textAlign: "center",
    },
    haveAccText: {
      textAlign: "center",
      color: theme.colors.heading,
    },
    haveAccContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: hp(2),
    },
    signupText: {
      color: colors.primaryLight,
      marginHorizontal: wp(1),
      textDecorationLine: "underline",
    },
    submitButton: {
      marginTop: hp(2),
    },
  });

export default createStyles;
