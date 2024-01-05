import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(2.5),
    backgroundColor: colors.white,
  },
  form: {
    paddingHorizontal: wp(5),
    flex: 1,
    marginTop: hp(3),
  },
  input: {
    marginVertical: hp(1),
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: hp(1),
    paddingHorizontal: wp(4),
  },
  forgetPassword: {
    marginVertical: hp(4),
  },
  forgetPasswordText: {
    textAlign: "center",
  },
  haveAccText: {
    textAlign: "center",
  },
  haveAccContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: hp(3),
  },
  signupText: {
    color: colors.primaryLight,
    marginHorizontal: wp(1),
    textDecorationLine: "underline",
  },
});

export default styles;
