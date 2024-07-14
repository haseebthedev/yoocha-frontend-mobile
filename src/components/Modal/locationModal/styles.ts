import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: theme.colors.bgColor,
    },
    header: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      paddingHorizontal: wp(5),
      paddingVertical: hp(2),
    },
    map: {
      flex: 1,
      backgroundColor: "#F87D7D",
    },
    mapOptionsContainer: {
      flexDirection: "row",
      paddingHorizontal: wp(5),
      justifyContent: "space-between",
      position: "absolute",
      top: hp(10),
      width: wp(100),
    },
    mapOptions: {
      width: wp(13),
      height: wp(13),
      backgroundColor: "#EEEEEEE0",
      borderRadius: wp(6.5),
      alignItems: "center",
      justifyContent: "center",
    },
    liveLocation: {
      padding: wp(5),
      flexDirection: "row",
      alignItems: "center",
      borderBottomColor: colors.bgGrey,
      borderBottomWidth: 1,
    },
    liveLocationIcon: {
      backgroundColor: "green",
      marginRight: wp(3),
      height: wp(12),
      width: wp(12),
      borderRadius: wp(6),
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default createStyles;
