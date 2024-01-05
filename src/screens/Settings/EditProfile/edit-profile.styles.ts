import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(2.5),
    backgroundColor: colors.white,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp(5),
  },
  profileImage: {
    marginTop: 20,
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  changeImageBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.white,
    width: 35,
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 2,
  },
  infoContainer: {
    marginVertical: hp(2.4),
  },
  pickerInputField: {
    paddingVertical: hp(1.7),
    borderWidth: 1,
    borderColor: colors.lightShade,
    borderRadius: 8,
    paddingHorizontal: 20,
    marginTop: hp(1),
  },
  topSpacing: {
    marginTop: hp(1),
  },
});

export default styles;
