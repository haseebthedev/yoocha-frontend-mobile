import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    // paddingHorizontal: wp(5),
    paddingBottom: 15,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.grey,
  },
  sideBtn: {
    borderWidth: 1,
    borderColor: "#EBEBEB",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});

export default styles;
