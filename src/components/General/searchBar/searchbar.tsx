import * as React from "react";
import { View, TextInput, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { wp } from "utils/responsive";
import { colors, typography } from "theme";
import Ionicons from "react-native-vector-icons/Ionicons";

interface SearchBarProps {
  iconColor?: string;
  placeholderColor?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
}

export const SearchBar: React.FC<SearchBarProps> = ({ containerStyle, inputStyle, iconColor, placeholderColor }) => {
  return (
    <View style={StyleSheet.flatten([styles.searchbarContainer, containerStyle])}>
      <Ionicons name="search-outline" size={20} color={iconColor} />
      <TextInput
        placeholder="Search"
        style={StyleSheet.flatten([styles.searchbarInput, inputStyle])}
        placeholderTextColor={placeholderColor}
      />
    </View>
  );
};

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
