import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
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
    elevation: 1,
  },
  recieveTime: {
    fontSize: 10,
    color: colors.textDim,
  },
});

export default styles;
