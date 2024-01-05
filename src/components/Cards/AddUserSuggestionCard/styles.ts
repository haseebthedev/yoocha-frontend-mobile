import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: wp(5),
    paddingBottom: 15,
  },
  profilePic: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.grey,
  },
  addFriendBlock: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: wp(2),
    paddingHorizontal: wp(2),
    borderRadius: wp(1.5),
    justifyContent: "center",
  },
  addFriendText: {
    marginLeft: wp(2),
    color: colors.white,
  },
});

export default styles;
