import { StyleSheet } from "react-native";
import { colors, typography } from "theme";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    publicProfileContainer: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    headerStyle: {
      color: colors.white,
    },
    staticHeaderContainer: {
      backgroundColor: colors.primary,
      marginTop: hp(2.5),
    },
    container: {
      flex: 1,
      paddingTop: hp(2.5),
      backgroundColor: colors.primary,
    },
    containerStyle: {
      gap: wp(1),
      backgroundColor: colors.white,
    },
    mainContainer: {
      marginTop: hp(14),
      flex: 1,
      backgroundColor: theme.colors.bgColor,
      borderTopRightRadius: hp(6),
      borderTopLeftRadius: hp(6),
      position: "relative",
      paddingHorizontal: wp(5),
    },
    roundedContainer: {
      position: "absolute",
      flexDirection: "column",
      alignItems: "center",
      top: hp(-7.5),
      left: 0,
      right: 0,
    },
    profileImageContainer: {
      width: wp(31),
      height: wp(31),
      borderRadius: wp(15.5),
      backgroundColor: theme.colors.personImageBg,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: wp(1),
      borderColor: theme.colors.bgColor,
      zIndex: 100,
    },
    imagePlaceholder: {
      width: wp(15),
      height: hp(10.5),
    },
    profilePic: {
      width: wp(31),
      height: wp(31),
      borderRadius: wp(15.5),
      borderWidth: wp(1),
      borderColor: theme.colors.bgColor,
      zIndex: 100,
    },
    name: {
      marginTop: hp(1.2),
      color: theme.colors.heading,
    },
    location: {
      flexDirection: "row",
      alignItems: "center",
      gap: wp(2),
      marginTop: hp(1),
      color: theme.colors.heading,
    },
    infoContainer: {
      marginTop: hp(20),
      paddingHorizontal: wp(5),
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    info: {
      fontSize: hp(3.2),
      fontFamily: typography.semiBold,
      color: colors.primary,
    },
    infoHeading: {
      flexDirection: "column",
      alignItems: "center",
    },
    infoText: {
      fontFamily: typography.light,
      fontSize: hp(1.9),
    },
    addFriendBtnContainer: {
      marginTop: hp(5),
    },
    tabNavContainer: {
      paddingHorizontal: wp(5),
    },
    tabNav: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: hp(5),
      gap: wp(15),
    },
    tabNavText: {
      textAlign: "center",
      fontFamily: typography.semiBold,
      fontSize: hp(1.6),
      color: colors.grey,
    },
    divider: {
      width: wp(90),
      height: 1,
      backgroundColor: colors.lightShade,
      marginVertical: hp(1.3),
    },
    postImage: {
      width: wp(28),
      height: hp(20),
      borderRadius: hp(1.8),
    },
    imagesGrid: {
      flex: 1,
      margin: 0,
      alignItems: "center",
      marginBottom: hp(2),
    },
    postContainer: {
      height: hp(19.65),
      backgroundColor: colors.white,
    },
  });

export default createStyles;
