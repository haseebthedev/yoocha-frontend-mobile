import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp } from "utils/responsive";

const styles = StyleSheet.create({
  spacing: {
    paddingVertical: hp(1.2),
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: colors.lightShade,
  },
});

export default styles;
