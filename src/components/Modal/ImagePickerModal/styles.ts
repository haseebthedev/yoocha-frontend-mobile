import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.white,
    alignItems: "center",
  },
  btnParentSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: hp(2),
    width: wp(100),
  },
  btnSection: {
    // paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    // backgroundColor: colors.lightShade,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: hp(0.2),
  },
});

export default styles;
