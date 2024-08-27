import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    cardContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
      paddingBottom: 15,
    },
    leftContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    profileImageContainer: {
      width: wp(14),
      height: wp(14),
      borderRadius: wp(7),
      backgroundColor: theme.colors.personImageBg,
      alignItems: "center",
      justifyContent: "center",
    },
    placeholderImage: {
      width: wp(6),
      height: wp(8.3),
    },
    profileImage: {
      width: wp(14),
      height: wp(14),
      borderRadius: wp(7),
    },
    sideBtn: {
      borderWidth: 1,
      borderColor: theme.colors.borderColor,
      borderRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 8,
    },
    username: {
      color: theme.colors.heading,
    },
    location: {
      color: theme.colors.subHeading,
    },
    btnText: {
      color: theme.colors.heading,
    },
  });

export default createStyles;
