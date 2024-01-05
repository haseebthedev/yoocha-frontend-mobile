import { StyleSheet } from "react-native";
import { colors } from "theme";
import { wp } from "utils/responsive";

const styles = StyleSheet.create({
  addFriendBlock: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: wp(2),
    paddingHorizontal: wp(2.7),
    borderRadius: wp(1.5),
    justifyContent: "center",
  },
  addFriendText: {
    marginLeft: wp(2),
    color: colors.white,
  },
});

export default styles;
