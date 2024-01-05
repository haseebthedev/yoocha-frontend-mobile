import * as React from "react";
import { View, TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { wp } from "utils/responsive";
import { colors, typography } from "theme";
import Ionicons from "react-native-vector-icons/Ionicons";

export function SearchBar() {
  return (
    <View style={styles.searchbarContainer}>
      <Ionicons name="search-outline" size={20} />
      <TextInput placeholder="Search" style={styles.searchbarInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: wp(5),
    borderWidth: 1,
    borderColor: colors.lightShade,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchbarInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: typography.regular,
    marginBottom: -5,
  },
});
