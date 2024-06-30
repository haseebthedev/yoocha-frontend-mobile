import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      position: "absolute",
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      zIndex: 1,
      paddingHorizontal: wp(5),
    },
    modalView: {
      width: wp(90),
      alignItems: "center",
      borderRadius: wp(3),
      backgroundColor: theme.colors.drawerBgColor,
      paddingHorizontal: wp(5),
      paddingVertical: hp(5),
      position: "absolute",
      bottom: hp(9.5),
    },
    innerContainer: {
      width: wp(70),
      flexDirection: "row",
      flexWrap: "wrap",
      rowGap: hp(3),
      columnGap: hp(0.5),
    },
    fileTypeContainer: {
      width: wp(22.6),
      alignItems: "center",
    },
    title: {
      color: theme.colors.subHeading,
    },
    iconContainer: {
      width: wp(16),
      height: wp(16),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: wp(50),
      marginBottom: hp(1.4),
    },
    bgDocument: {
      backgroundColor: colors.primary,
    },
    bgCamera: {
      backgroundColor: colors.darkPink,
    },
    bgGallery: {
      backgroundColor: colors.darkPurple,
    },
    bgAudio: {
      backgroundColor: colors.darkOrange,
    },
    bgLocation: {
      backgroundColor: colors.darkGreen,
    },
  });

export default createStyles;
