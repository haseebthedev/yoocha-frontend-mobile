import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
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
    profileImageContainer: {
      width: wp(8),
      height: wp(8),
      backgroundColor: theme.colors.personImageBg,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: wp(5),
      marginTop: 10,
      marginRight: 10,
    },
    placeholderImage: {
      width: wp(3),
      height: wp(4.3),
    },
    otherParticipantImage: {
      width: wp(8),
      height: wp(8),
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
      color: theme.colors.subHeading,
    },
  });

export default createStyles;
