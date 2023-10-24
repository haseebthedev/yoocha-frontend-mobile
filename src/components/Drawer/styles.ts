import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: wp(6),
    paddingVertical: hp(8),
    borderTopRightRadius: hp(5),
    borderBottomRightRadius: hp(5),
  },
  profilePic: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(10),
    borderWidth: 1,
    borderColor: colors.white,
  },
  username: {
    fontSize: hp(1.8),
    color: colors.white,
  },
  useremail: {
    fontSize: hp(1.5),
    color: colors.white,
  },
  bottomBlock: {
    marginTop: hp(5),
    gap: hp(1.5),
  },
  optionBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp(1.5),
  },
  innerLeftBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: hp(1.5),
  },
  navText: {
    fontSize: hp(1.8),
    color: colors.white,
    lineHeight: hp(2.2),
  },
  flexAlignCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  spacingTop: {
    marginLeft: wp(3),
  },
});

export default styles;
