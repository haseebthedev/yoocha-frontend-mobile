import { StyleSheet } from "react-native";
import { colors, typography } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(2.5),
    backgroundColor: colors.white,
  },
  form: {
    flex: 1,
    marginVertical: hp(6),
    paddingHorizontal: wp(5),
  },
  head: { alignItems: "center" },
  subHeading: {
    width: wp(80),
    textAlign: "center",
    color: colors.textDim,
  },
  dontRecieveCodeText: {
    textAlign: "center",
  },
  dontRecieveCodeContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  codeExpireText: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    color: colors.primary,
  },
  inputFields: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: hp(3.5),
    paddingHorizontal: wp(5.5),
  },
  codeVerifyBlock: {
    backgroundColor: colors.bgGrey,
    borderRadius: hp(0.6),
    width: hp(7),
    textAlign: "center",
    fontSize: hp(3),
    color: colors.primary,
    fontFamily: typography.regular,
  },
});

export default styles;
