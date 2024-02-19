import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "rgba(0,0,0,.3)",
  },
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
    paddingVertical: hp(1),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: hp(0.2),
  },
  heading: { textAlign: "center" },
});

export default styles;
