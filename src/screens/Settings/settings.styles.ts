import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: hp(2.5),
      backgroundColor: colors.primary,
    },
    headerTitle: { color: colors.white },
    listContainer: {
      flex: 1,
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
      paddingHorizontal: wp(5),
      backgroundColor: theme.colors.bgColor,
    },
    spacing: {
      marginTop: hp(3),
      paddingHorizontal: wp(5),
    },
    deleteAccount: {
      paddingHorizontal: wp(10),
      backgroundColor: theme.colors.bgColor,
    },
  });

export default createStyles;
