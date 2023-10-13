import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(0.5),
  },
  imageOuterBlock: {
    borderRadius: wp(8),
    borderWidth: 1,
    borderColor: colors.primary,
    position: "relative",
  },
  imgBlock: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    borderColor: "white",
    borderWidth: 1.5,
  },
  addBtnContainer: {
    backgroundColor: colors.primary,
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  nameText: {
    fontSize: hp(1.1),
    textAlign: "center",
    marginTop: hp(0.4),
  },
});

export default styles;
