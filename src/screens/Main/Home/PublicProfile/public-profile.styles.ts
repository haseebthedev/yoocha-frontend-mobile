import { StyleSheet } from "react-native";
import { colors, typography } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  publicProfileContainer: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  staticHeaderContainer: {
    backgroundColor: colors.primary,
    marginTop: hp(2.5),
  },
  container: {
    flex: 1,
    paddingTop: hp(2.5),
    backgroundColor: colors.primary,
  },
  mainContainer: {
    marginTop: hp(14),
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    position: "relative",
    paddingHorizontal: wp(5),
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
    zIndex: 100,
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
  imagesGrid: {
    marginBottom: hp(2),
    flex: 1,
    margin: 0,
    alignItems: "center",
  },
});

export default styles;
