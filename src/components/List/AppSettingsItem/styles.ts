import { StyleSheet } from "react-native";
import { colors, typography } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp(2),
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3.5),
  },
  text: {
    fontFamily: typography.regular,
    fontSize: 16,
    marginTop: hp(0.35),
    color: colors.textDark,
  },
});

export default styles;
