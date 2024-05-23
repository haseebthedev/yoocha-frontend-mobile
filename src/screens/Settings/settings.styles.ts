import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(2.5),
    backgroundColor: colors.primary,
  },
  headerTitle: { color: colors.white },
  listContainer: {
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: wp(5),
  },
  spacing: {
    marginTop: hp(3),
    paddingHorizontal: wp(5),
  },
  deleteAccount: {
    paddingHorizontal: wp(10),
  },
});

export default styles;
