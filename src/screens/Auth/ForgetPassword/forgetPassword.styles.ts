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
    flex: 1,
    paddingHorizontal: wp(5),
    marginVertical: hp(6),
  },
  subHeading: {
    width: wp(80),
    textAlign: "center",
    color: colors.textDim,
    marginBottom: hp(2),
  },
});

export default styles;
