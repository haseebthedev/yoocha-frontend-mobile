import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  topHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(5),
  },
  statusHeader: { zIndex: 1 },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    borderColor: colors.white,
    borderWidth: hp(0.15),
    marginRight: wp(3),
  },
  statusBarLine: {
    height: hp(0.3),
    width: wp(90),
    backgroundColor: colors.textDim,
    marginHorizontal: wp(5),
    marginBottom: hp(2),
  },
  statusBar: {
    height: "100%",
    width: wp(40),
    backgroundColor: colors.white,
  },
  name: {
    color: colors.white,
  },
  dateAndTime: {
    color: colors.grey,
  },
  statusPic: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
    zIndex: 0,
  },
  closeBtn: {
    backgroundColor: colors.rgbGrey,
    borderRadius: hp(2),
    padding: hp(0.5),
  },
});

export default styles;
