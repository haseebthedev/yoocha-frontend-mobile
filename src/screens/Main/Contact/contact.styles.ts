import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(2.5),
    backgroundColor: colors.white,
  },
  appHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    borderBottomColor: colors.lightShade,
    borderBottomWidth: 1,
  },
  topHeaderBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    backgroundColor: colors.white,
  },
  menuContainer: {
    backgroundColor: colors.lightShade,
    width: wp(44),
    paddingVertical: hp(1.5),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(2),
},
selectedMenuStyles: {
    backgroundColor: colors.primary,
  },
  menuText: {
    color: colors.textDim,
  },
  selectedMenuText: {
    color: colors.white
  }
});

export default styles;
