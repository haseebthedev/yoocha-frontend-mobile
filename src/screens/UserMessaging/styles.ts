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
      justifyContent: "flex-start",
      alignItems: "center",
      paddingVertical: hp(2),
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: wp(5),
      borderBottomColor: theme.colors.borderColor,
      borderBottomWidth: 1,
    },
    profileImage: {
      width: wp(10),
      height: wp(10),
      borderRadius: wp(5),
      marginLeft: wp(4),
      marginRight: wp(3),
    },
    listContainer: {
      paddingVertical: hp(1),
    },
    messageContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    messageTextContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    otherParticipantImage: {
      width: wp(10),
      height: wp(10),
      borderRadius: wp(5),
      marginTop: 10,
      marginRight: 10,
    },
    messageText: {
      maxWidth: wp(65),
      padding: 10,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      // elevation: 1,
    },
    recieveTime: {
      fontSize: 10,
      color: colors.textDim,
    },
    flexAlignCenter: {
      flexDirection: "row",
      alignItems: "center",
    },
    name: {
      color: theme.colors.heading,
    },
    lastSeenText: {
      fontSize: hp(1.3),
      color: theme.colors.subHeading,
    },
    bodyContainer: {
      flex: 1,
      backgroundColor: theme.colors.chatScreenBgColor,
    },
    listHeight: {
      flex: 1,
      marginBottom: hp(8),
    },
    loadingContainer: {
      flex: 1,
      backgroundColor: colors.lightShade,
    },
    inputFieldBlock: {
      height: hp(7),
      width: wp(100),
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: wp(2),
      gap: 20,
      paddingHorizontal: wp(4),
      position: "absolute",
      bottom: 0,
      backgroundColor: theme.colors.bgColor,
      borderTopWidth: 1,
      borderTopColor: theme.colors.borderColor,
    },
    inputfield: {
      width: wp(80),
      borderRadius: wp(2),
      paddingVertical: hp(0.7),
      paddingHorizontal: wp(5),
      color: theme.colors.heading,
    },
    paddingVertical: {
      paddingVertical: hp(0.5),
    },
    loaderStyle: {
      marginVertical: 16,
      alignItems: "center",
    },
    emptyTextContainer: {
      paddingHorizontal: wp(5),
      alignItems: "center",
    },
    emptyTextPlaceholder: {
      color: theme.colors.subHeading,
    },
  });

export default createStyles;
