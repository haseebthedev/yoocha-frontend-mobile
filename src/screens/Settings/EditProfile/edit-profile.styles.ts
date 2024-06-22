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
    mainContainer: {
      flex: 1,
      paddingHorizontal: wp(5),
    },
    profileImageContainer: {
      width: wp(31),
      height: hp(15.5),
      borderRadius: hp(10),
      backgroundColor: theme.colors.personImageBg,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.primary,
    },
    imagePlaceholder: {
      width: wp(15),
      height: hp(10.5),
    },
    imgContainer: {
      marginTop: hp(2.8),
      alignSelf: "center",
    },
    profileImage: {
      width: wp(31),
      height: hp(15.5),
      borderRadius: hp(10),
      borderWidth: 1,
      borderColor: colors.primary,
    },
    changeImageBtn: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: colors.white,
      width: 35,
      height: 35,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
      elevation: 2,
    },
    infoContainer: {
      marginVertical: hp(2.4),
    },
    pickerInputField: {
      paddingVertical: hp(1.7),
      borderWidth: 1,
      borderColor: theme.colors.borderColor,
      borderRadius: 8,
      paddingHorizontal: wp(3.6),
      marginVertical: hp(1),
    },
    topSpacing: {
      marginTop: hp(1.6),
    },
    body: {
      backgroundColor: colors.white,
      alignItems: "center",
    },
    btnParentSection: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: hp(2),
      width: wp(100),
    },
    btnSection: {
      paddingVertical: hp(1),
      alignItems: "center",
      justifyContent: "center",
      borderRadius: hp(0.2),
    },
    heading: { textAlign: "center" },
  });

export default createStyles;
