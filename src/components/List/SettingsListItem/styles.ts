import { StyleSheet } from "react-native";
import { colors, typography } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingVertical: 15,
    borderBottomColor: colors.lightShade,
    borderBottomWidth: 1,
  },
  listText: {
    fontFamily: typography.regular,
    fontSize: 16,
    marginTop: 3,
    color: colors.textDark,
  },
});

export default styles;
