import { StyleSheet } from "react-native";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      height: hp(11),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: wp(5),
      paddingVertical: hp(0.7),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderColor,
    },
    profileContainer: {
      flexDirection: "row",
      alignItems: "center",
      maxWidth: wp(50),
    },
    profileImage: {
      width: wp(14),
      height: hp(7),
      borderRadius: wp(10),
    },
    textContainer: {
      marginLeft: wp(2),
      width: wp(74),
    },
    notificationText: {
      width: wp(60),
      marginTop: hp(-0.4),
      color: theme.colors.heading,
    },
    nameWithDate: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: hp(0.5),
    },
    name: {
      color: theme.colors.heading,
    },
    time: {
      fontSize: hp(1.5),
      color: theme.colors.heading,
    },
  });

export default createStyles;
