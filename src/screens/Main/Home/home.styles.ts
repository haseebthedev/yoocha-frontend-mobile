import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(2.5),
    backgroundColor: colors.white,
  },
  darkContainer: {
    flex: 1,
    paddingTop: hp(2.5),
    backgroundColor: colors.charcoalBlack,
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    paddingRight: wp(5),
  },
  appHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
  },
  sidebarContainer: {
    width: wp(20),
    backgroundColor: colors.lightShade,
  },
  sidebarList: {
    alignSelf: "center",
    paddingVertical: hp(1),
  },
  sidebarListContentContainer: {
    paddingBottom: hp(5),
  },
  mainBodyContainer: {
    flex: 1,
    paddingLeft: hp(1),
    paddingTop: hp(1),
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
  listChatroom: { flex: 1 },
  listChatroomContainer: { paddingBottom: 20 },
  emptyTextContainer: {
    paddingHorizontal: wp(5),
    alignItems: "center",
  },
  loaderContainer: {
    height: hp(18),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp(2.2),
  },
});

export default styles;
