import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  linkText: {
    color: colors.primaryLight,
    marginHorizontal: wp(1),
    textDecorationLine: "underline",
  },
});

export default styles;
