import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    height: hp(11),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingVertical: wp(1.2),
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: wp(50),
  },
  profileImage: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
  },
  textContainer: {
    marginLeft: wp(2),
    width: wp(74),
  },
  notificationText: {
    color: colors.textDim,
    width: wp(60),
    marginTop: hp(-0.4),
  },
  nameWithDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(0.5),
  },
});

export default styles;
