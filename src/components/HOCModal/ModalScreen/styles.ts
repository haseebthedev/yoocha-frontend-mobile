import { StyleSheet } from "react-native";
import { colors } from "theme";
import { isIOS } from "utils/deviceInfo";
import { hp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  modalView: {
    height: hp(100),
    backgroundColor: colors.black,
    paddingTop: isIOS ? hp(6.5) : hp(3),
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
  },
});

export default styles;
