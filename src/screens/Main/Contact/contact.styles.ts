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
    heading: {
      color: theme.colors.heading,
    },
    iconBlock: {
      width: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    appHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: wp(5),
      paddingVertical: hp(2),
    },
    suggestionsContainer: {
      flexDirection: "row",
      height: hp(20),
      gap: wp(4),
      justifyContent: "center",
    },
    loaderContainer: {
      height: hp(18),
      alignItems: "center",
      justifyContent: "center",
      marginBottom: hp(2.2),
    },
    exploreContainer: {
      flex: 1,
      paddingHorizontal: wp(5),
      marginTop: hp(1),
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
    loaderStyle: {
      marginVertical: 16,
      alignItems: "center",
    },
    emptyText: { width: wp(90) },
    emptyTextPlaceholder: {
      color: theme.colors.subHeading,
    },
    activityIndicatorContainer: {
      height: hp(19),
      width: wp(90),
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default createStyles;
