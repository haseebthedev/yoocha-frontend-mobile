import { StyleSheet } from "react-native";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  iconContainer: {
    flex: 1,
  },
});

export default styles;
