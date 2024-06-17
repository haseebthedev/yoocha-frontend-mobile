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
    mainContainer: {
      flex: 1,
      flexDirection: "row",
    },
    appHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: wp(5),
      paddingVertical: hp(2),
    },
    unreadMessageContainer: {
      backgroundColor: colors.primary,
      width: wp(5),
      height: wp(5),
      borderRadius: wp(5),
      justifyContent: "center",
      alignItems: "center",
      marginBottom: hp(1),

      position: "absolute",
      left: 15,
      top: -8,
    },
    unreadMessageText: {
      color: colors.white,
      fontSize: hp(1.5),
    },
    sidebarContainer: {
      width: wp(20),
      backgroundColor: colors.lightShade,
    },
    sidebarList: {
      alignSelf: "center",
      paddingVertical: hp(1),
    },
    sidebarListContentContainer: {
      paddingBottom: hp(5),
    },
    mainBodyContainer: {
      flex: 1,
      paddingHorizontal: wp(5),
      paddingTop: hp(1),
    },
    loaderStyle: {
      marginVertical: 16,
      alignItems: "center",
    },
    listChatroom: { flex: 1 },
    listChatroomContainer: { paddingBottom: 20 },
    emptyTextContainer: {
      paddingHorizontal: wp(5),
      alignItems: "center",
    },
    loaderContainer: {
      height: hp(18),
      alignItems: "center",
      justifyContent: "center",
      marginBottom: hp(2.2),
    },
    emptyTextPlaceholder: {
      color: theme.colors.subHeading,
    },
  });

export default createStyles;
