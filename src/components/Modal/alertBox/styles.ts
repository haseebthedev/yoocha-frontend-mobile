import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: colors.modalBG,
      zIndex: 1,
      paddingHorizontal: wp(5),
    },
    modalView: {
      width: wp(80),
      alignItems: "center",
      borderRadius: wp(3),
      backgroundColor: theme.colors.drawerBgColor,
      // backgroundColor: colors.white,
      paddingHorizontal: wp(5),
      paddingBottom: hp(0.6),
      paddingTop: hp(2),
    },
    typeBlock: {
      width: hp(6),
      height: hp(6),
      borderRadius: hp(4),
      justifyContent: "center",
      alignItems: "center",
      marginBottom: hp(2),
    },
    typeSuccessBlock: {
      backgroundColor: colors.green,
      color: "white",
    },
    typeErrorBlock: {
      backgroundColor: colors.red,
      color: "red",
    },
    title: {
      textAlign: "center",
      marginBottom: hp(0.5),
      color: theme.colors.heading,
    },
    text: {
      textAlign: "center",
      fontSize: 14,
      color: theme.colors.heading,
    },
    btnContainer: {
      flexDirection: "row",
      marginTop: hp(2),
      gap: wp(4),
      marginBottom: hp(2),
    },
    btn: { flex: 1 },
  });

export default createStyles;
