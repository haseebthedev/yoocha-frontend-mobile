import { StyleSheet } from "react-native";
import { colors, typography } from "theme";
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
  mainContainer: {
    marginTop: hp(16),
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    position: "relative",
  },
  roundedContainer: {
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    top: -60,
    left: 0,
    right: 0,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: colors.white,
  },
  name: {
    marginTop: hp(1.2),
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  infoContainer: {
    marginTop: hp(20),
    paddingHorizontal: wp(5),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  info: {
    fontSize: 24,
    fontFamily: typography.semiBold,
    color: colors.primary,
  },
  infoText: {
    fontFamily: typography.light,
    fontSize: 14,
  },
  tabNavContainer: {
    paddingHorizontal: wp(5),
  },
  tabNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(5),
    gap: 50,
  },
  tabNavText: {
    textAlign: "center",
    fontFamily: typography.semiBold,
    fontSize: 12,
    color: colors.primary,
  },
  divider: {
    width: wp(90),
    height: 1,
    backgroundColor: colors.lightShade,
    marginVertical: 10,
  },
  postImage: {
    width: wp(28),
    height: hp(20),
    borderRadius: 12,
  },
});

export default styles;
