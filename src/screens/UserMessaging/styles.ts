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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    borderBottomColor: colors.lightShade,
    borderBottomWidth: 1,
  },
  profileImage: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    marginLeft: wp(4),
    marginRight: wp(3)
  },
});

export default styles;
