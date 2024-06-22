import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: wp(6),
      paddingVertical: hp(8),
      borderTopRightRadius: hp(2),
      borderBottomRightRadius: hp(2),
      backgroundColor: theme.colors.drawerBgColor,
    },
    profileImageContainer: {
      width: wp(18),
      height: wp(18),
      borderRadius: wp(10),
      backgroundColor: theme.colors.personImageBg,
      alignItems: "center",
      justifyContent: "center",
    },
    placeholderImage: {
      width: wp(8),
      height: wp(10.5),
    },
    profilePic: {
      width: wp(18),
      height: wp(18),
      borderRadius: wp(10),
    },
    username: {
      fontSize: hp(1.8),
      color: theme.colors.heading,
    },
    useremail: {
      fontSize: hp(1.5),
      color: theme.colors.subHeading,
    },
    bottomBlock: {
      marginTop: hp(5),
      gap: hp(1.5),
    },
    optionBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: hp(1.5),
    },
    innerLeftBlock: {
      flexDirection: "row",
      alignItems: "center",
      gap: hp(1.5),
    },
    navText: {
      fontSize: hp(1.8),
      lineHeight: hp(2.2),
      color: theme.colors.heading,
    },
    flexAlignCenter: {
      flexDirection: "row",
      alignItems: "center",
    },
    spacingTop: {
      marginLeft: wp(3),
    },
  });

export default createStyles;
