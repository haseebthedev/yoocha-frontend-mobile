import { StyleSheet } from "react-native";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
  },
  btnParentSection: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: hp(2),
    width: wp(100),
  },
  btnSection: {
    paddingVertical: hp(1),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: hp(0.2),
  },
  heading: { textAlign: "center" },
});

export default styles;
