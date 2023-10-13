import { StyleSheet } from "react-native";
import { isIOS } from "utils/deviceInfo";
import { hp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: isIOS ? 0 : hp(3),
  },
  leftBlock: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginLeft: -5,
    // paddingRight: 10,
  },
});

export default styles;
