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
  },
  suggestionsContainer: {
    paddingHorizontal: wp(5),
  },
  suggestionListContainer: {
    gap: 8,
  },
  loaderContainer: {
    height: hp(18),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp(2.2),
  },
  exploreContainer: {
    flex: 1,
    paddingHorizontal: wp(5),
    marginTop: hp(1),
  },

  menuContainer: {
    backgroundColor: colors.white,
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
    color: colors.white,
  },
});

export default styles;
