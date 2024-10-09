import { StyleSheet } from "react-native";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: hp(2.5),
      backgroundColor: theme.colors.bgColor,
    },
    notiList: {
      flex: 1,
      paddingTop: hp(1),
    },
    notiListContainer: {
      flexGrow: 1,
      paddingBottom: hp(1),
    },
    notificationDivider: {
      height: 1,
      width: wp(100),
    },
    loaderStyle: {
      marginVertical: hp(1),
      alignItems: "center",
    },
    emptyTextPlaceholder: {
      color: theme.colors.subHeading,
    },
  });

export default createStyles;
