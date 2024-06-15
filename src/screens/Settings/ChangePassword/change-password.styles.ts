import { StyleSheet } from "react-native";
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
      marginTop: hp(6),
      paddingHorizontal: wp(5),
    },
    subHeading: {
      width: wp(80),
      textAlign: "center",
      color: theme.colors.heading,
      marginBottom: hp(2),
    },
  });

export default createStyles;
