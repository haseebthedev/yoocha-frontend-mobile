import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(2.5),
    backgroundColor: colors.white,
  },
  appHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    borderBottomColor: colors.lightShade,
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
    paddingVertical: 20,
    flexGrow: 1,
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
    elevation: 1,
  },
  recieveTime: {
    fontSize: 10,
    color: colors.textDim,
  },
  flexAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  lastSeenText: {
    fontSize: hp(1.3),
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: colors.lightShade,
  },
  listHeight: {
    height: hp(80),
    // flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.lightShade,
  },
  inputFieldBlock: {
    height: hp(8),
    width: wp(100),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: wp(4),
    gap: 20,
    paddingHorizontal: wp(5),
    position: "absolute",
    bottom: 0,
  },
  inputfield: {
    width: wp(80),
    backgroundColor: colors.lightShade,
    color: colors.textDim,
    borderRadius: wp(2),
    paddingVertical: hp(0.7),
    paddingHorizontal: wp(5),
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
});

export default styles;
