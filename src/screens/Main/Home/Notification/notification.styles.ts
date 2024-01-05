import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(2.5),
    backgroundColor: colors.white,
  },
  notiList: {
    flex: 1,
    paddingTop: hp(1),
  },
  notiListContainer: {
    paddingBottom: hp(2.7),
  },
  notificationDivider: {
    height: 1,
    width: wp(100),
    backgroundColor: colors.lightShade,
  },
});

export default styles;
