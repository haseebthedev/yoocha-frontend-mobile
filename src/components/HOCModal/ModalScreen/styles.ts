import { StyleSheet } from "react-native";

import { hp } from "utils/responsive";
import { colors } from "theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  modalView: {
    height: hp(100),
    backgroundColor: colors.black,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
  },
});

export default styles;
