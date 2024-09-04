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
    appHeader: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingVertical: hp(2),
    },
    menuButton: {
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: wp(5),
      borderBottomColor: theme.colors.borderColor,
      borderBottomWidth: 1,
    },
    userData: {
      flexDirection: "row",
      alignItems: "center",
    },
    imageContainer: {
      width: wp(10),
      height: wp(10),
      borderRadius: wp(5),
      marginLeft: wp(2),
      marginRight: wp(3),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.personImageBg,
    },
    imagePlaceholder: {
      width: wp(4.9),
      height: wp(6),
      borderRadius: wp(5),
    },
    profileImage: {
      width: wp(10),
      height: wp(10),
      borderRadius: wp(5),
    },
    listContainer: {
      paddingVertical: hp(1),
    },
    flexAlignCenter: {
      flexDirection: "row",
      alignItems: "center",
    },
    name: {
      color: theme.colors.heading,
    },
    bodyContainer: {
      flex: 1,
      backgroundColor: theme.colors.chatScreenBgColor,
    },
    listHeight: {
      flex: 1,
      marginBottom: hp(8),
    },
    loadingContainer: {
      flex: 1,
      backgroundColor: colors.lightShade,
    },
    inputFieldBlock: {
      height: hp(8),
      width: wp(100),
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: wp(2),
      paddingHorizontal: wp(5),
      justifyContent: "space-between",
      position: "absolute",
      bottom: 0,
      backgroundColor: theme.colors.bgColor,
      borderTopWidth: 1,
      borderTopColor: theme.colors.borderColor,
    },
    inputImage: {
      // width: wp(78),
      // backgroundColor: "red",
    },
    removeImageButton: {
      position: "absolute",
      bottom: hp(3.5),
      left: wp(6.8),
      zIndex: 100,
      backgroundColor: "white",
      borderRadius: hp(2),
    },
    image: {
      width: wp(10),
      height: hp(5),
      borderRadius: wp(1),
    },
    inputfield: {
      width: wp(70),
      borderRadius: wp(2),
      paddingVertical: hp(0.7),
      color: theme.colors.heading,
    },
    paddingVertical: {
      paddingVertical: hp(0.5),
    },
    loaderStyle: {
      marginVertical: 16,
      alignItems: "center",
    },
    emptyTextContainer: {
      paddingHorizontal: wp(5),
      alignItems: "center",
    },
    emptyTextPlaceholder: {
      color: theme.colors.subHeading,
    },
    actionButtons: {
      flexDirection: "row",
      gap: wp(1),
      alignItems: "center",
    },
  });

export default createStyles;
