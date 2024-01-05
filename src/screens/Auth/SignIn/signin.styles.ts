import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(2.5),
    backgroundColor: colors.white,
    paddingHorizontal: wp(5),
  },
  form: {
    flex: 1,
    marginTop: hp(6),
  },
  forgetPassword: {
    marginVertical: hp(2),
  },
  forgetPasswordText: {
    textAlign: "center",
  },
  dontHaveAccText: {
    textAlign: "center",
  },
  dontHaveAccContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default styles;
