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
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: wp(5),
      paddingVertical: hp(2),
    },
    subContainer: { flex: 1 },
    searchBarStyle: { marginBottom: hp(2) },
    searchBar: {
      backgroundColor: theme.colors.bgColor,
      borderColor: theme.colors.borderColor,
    },
    searchBarText: {
      color: theme.colors.heading,
    },
    topHeaderBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: hp(2),
      paddingHorizontal: wp(5),
      backgroundColor: colors.white,
    },
    menuContainer: {
      backgroundColor: colors.white,
      width: wp(44),
      paddingVertical: hp(1.5),
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: wp(2),
    },
    selectedMenuStyles: {
      backgroundColor: colors.primary,
    },
    menuText: {
      color: colors.textDim,
    },
    selectedMenuText: {
      color: colors.white,
    },
    emptyTextContainer: {
      paddingHorizontal: wp(5),
      alignItems: "center",
    },
    loaderContainer: {
      paddingTop: hp(5),
    },
    listContainerStyle: {
      marginTop: hp(2),
      paddingHorizontal: wp(5),
    },
    loaderStyle: {
      marginVertical: 16,
      alignItems: "center",
    },
    emptyTextPlaceholder: {
      color: theme.colors.subHeading,
    },
  });

export default createStyles;
