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
    messageImageContainer: {
      backgroundColor: colors.primary,
      padding: hp(0.5),
      borderRadius: wp(4),
      justifyContent: "center",
      alignItems: "center",
    },
    messageImage: {
      width: wp(60),
      height: wp(70),
      borderRadius: wp(4),
      resizeMode: "cover",
    },
  });

export default createStyles;
