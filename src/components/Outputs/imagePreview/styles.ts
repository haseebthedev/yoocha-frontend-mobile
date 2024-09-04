import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    topHeaderContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: wp(3),
      zIndex: 1,
      backgroundColor: "black",
    },
    imagePreviewHeader: {},
    userInfo: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: wp(2),
    },
    userName: {
      color: colors.white,
    },
    dateAndTime: {
      color: colors.grey,
    },
    previewImage: {
      width: wp(100),
      height: hp(100),
      position: "absolute",
      zIndex: 0,
    },
    backButton: {
      padding: hp(0.8),
    },
  });

export default createStyles;
