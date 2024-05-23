import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(2.5),
    backgroundColor: colors.primary,
  },
  appHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  contentContainer: {
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: wp(5),
    paddingTop: hp(4),
  },
});

export default styles;
