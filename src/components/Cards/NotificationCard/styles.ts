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
  },
  notificationText: {
    color: colors.textDim,
    width: wp(60),
    marginTop: hp(-0.4),
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  infoText: {
    color: colors.textDim,
    fontSize: hp(1.2),
  },
  unreadNotificationContainer: {
    backgroundColor: colors.primary,
    width: wp(5),
    height: wp(5),
    borderRadius: wp(5),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(1),
  },
  unreadNotificationText: {
    color: colors.white,
    fontSize: hp(1.2),
  },
});

export default styles;
