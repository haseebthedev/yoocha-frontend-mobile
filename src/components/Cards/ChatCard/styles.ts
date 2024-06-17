import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    profileContainer: {
      flexDirection: "row",
      alignItems: "center",
      maxWidth: wp(50),
    },
    profileImage: {
      width: wp(14),
      height: wp(14),
      borderRadius: wp(7),
    },
    name: {
      color: theme.colors.heading,
    },
    textContainer: {
      marginLeft: wp(2),
    },
    lastMessageText: {
      color: theme.colors.subHeading,
    },
    infoContainer: {
      flexDirection: "column",
      alignItems: "flex-end",
    },

    infoText: {
      color: theme.colors.subHeading,
      fontSize: hp(1.2),
    },
    unreadMessageContainer: {
      backgroundColor: colors.primary,
      width: wp(5),
      height: wp(5),
      borderRadius: wp(5),
      justifyContent: "center",
      alignItems: "center",
      marginBottom: hp(1),
    },
    unreadMessageText: {
      color: colors.white,
      fontSize: hp(1.2),
    },
  });

export default createStyles;
