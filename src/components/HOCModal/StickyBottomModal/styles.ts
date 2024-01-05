import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  backdrop: {
    alignItems: "center",
    backgroundColor: colors.modalBG,
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBg: {
    backgroundColor: colors.white,
    borderTopLeftRadius: hp(4),
    borderTopRightRadius: hp(4),
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(5),
    width: wp(100),
  },
  dashContainer: {
    width: wp(90),
    alignItems: "center",
    marginBottom: hp(3),
  },
  dash: {
    width: wp(8),
    height: hp(0.5),
    backgroundColor: colors.primary,
    borderRadius: hp(2),
  },
});

export default styles;
