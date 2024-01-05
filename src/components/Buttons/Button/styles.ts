import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: colors.primaryLight,
    paddingVertical: hp(1.8),
    marginVertical: hp(2),
    borderRadius: hp(1),
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
  btnTextFilled: {},
  btnContainerFilled: {
    backgroundColor: colors.primaryLight,
  },
  btnContainerOutlined: {
    backgroundColor: colors.transparent,
    borderColor: colors.primary,
    borderWidth: wp(0.4),
  },
  btnTextOutlined: {
    color: colors.primary,
  },
});

export default styles;
