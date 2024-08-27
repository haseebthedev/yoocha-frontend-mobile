import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    width: wp(28),
    height: hp(18),
    marginBottom: hp(2.2),
    borderRadius: wp(3),
    overflow: "hidden",
    position: "relative",
  },
  userProfilePic: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imagePlaceholder: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: hp(2),
  },
  gradientBlock: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bottomAbsoluteBlock: {
    position: "absolute",
    bottom: hp(1.5),
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  nameText: {
    color: colors.white,
    fontSize: hp(1.4),
  },
  addFriendBlock: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: wp(1),
    paddingHorizontal: wp(2),
    borderRadius: wp(1.5),
    justifyContent: "center",
  },
  addFriendText: {
    marginLeft: 3,
    fontSize: 7,
    color: colors.white,
  },
});

export default styles;
