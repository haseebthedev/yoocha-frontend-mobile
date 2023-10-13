import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(1.6),
  },
  rightText: {
    fontSize: hp(1.4),
    color: colors.primary,
  },
});

export default styles;
