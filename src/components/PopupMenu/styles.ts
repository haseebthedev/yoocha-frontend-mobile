import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  optionsContainer: {
    position: "absolute",
    top: hp(6.3),
    right: wp(2.5),
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: hp(1),
    backgroundColor: "white",
    elevation: 1,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: hp(2.5),
    paddingVertical: hp(1.8),
  },
  optionWithBorder: {
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  safeAreaStyle: { flex: 1 },
});

export default styles;
