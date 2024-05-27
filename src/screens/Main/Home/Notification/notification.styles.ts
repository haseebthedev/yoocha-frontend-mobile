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
      paddingBottom: hp(2.7),
    },
    notificationDivider: {
      height: 1,
      width: wp(100),
    },
  });

export default createStyles;
