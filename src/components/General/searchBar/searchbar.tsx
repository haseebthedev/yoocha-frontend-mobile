import React, { useRef, useState } from "react";
import { View, TextInput, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { wp } from "utils/responsive";
import { colors, typography } from "theme";
import Ionicons from "react-native-vector-icons/Ionicons";

interface SearchBarProps {
  iconColor?: string;
  placeholderColor?: string;
  containerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
  onSearchSubmit: (searchText: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  containerStyle,
  inputStyle,
  iconColor,
  placeholderColor,
  onSearchSubmit,
}) => {
  const inputRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchSubmit = () => {
    onSearchSubmit(searchText);
    // if (inputRef.current) {
    //   inputRef.current.clear();
    // }
  };

  return (
    <View style={StyleSheet.flatten([styles.searchbarContainer, containerStyle])}>
      <Ionicons name="search-outline" size={20} color={iconColor} />
      <TextInput
        ref={inputRef}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search"
        style={StyleSheet.flatten([styles.searchbarInput, inputStyle])}
        placeholderTextColor={placeholderColor}
        onSubmitEditing={handleSearchSubmit}
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

// import * as React from "react";
// import { View, TextInput, StyleSheet, ViewStyle, TextStyle } from "react-native";
// import { wp } from "utils/responsive";
// import { colors, typography } from "theme";
// import Ionicons from "react-native-vector-icons/Ionicons";

// interface SearchBarProps {
//   iconColor?: string;
//   placeholderColor?: string;
//   containerStyle?: ViewStyle | ViewStyle[];
//   inputStyle?: TextStyle | TextStyle[];
//   setSearchPeople: (text: string) => void;
//   onSearchSubmit: () => void;
//   searchPeople: string;
// }

// export const SearchBar: React.FC<SearchBarProps> = ({
//   containerStyle,
//   inputStyle,
//   iconColor,
//   placeholderColor,
//   setSearchPeople,
//   onSearchSubmit,
//   searchPeople,
// }) => {
//   const inputRef = React.useRef<TextInput>(null);

//   const handleSearchSubmit = () => {
//     onSearchSubmit();
//     if (inputRef.current) {
//       inputRef.current.clear(); // Clear the input field
//     }
//   };

//   return (
//     <View style={StyleSheet.flatten([styles.searchbarContainer, containerStyle])}>
//       <Ionicons name="search-outline" size={20} color={iconColor} />
//       <TextInput
//         placeholder="Search"
//         style={StyleSheet.flatten([styles.searchbarInput, inputStyle])}
//         placeholderTextColor={placeholderColor}
//         onChangeText={setSearchPeople}
//         onSubmitEditing={handleSearchSubmit}
//         value={searchPeople}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   searchbarContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "white",
//     marginHorizontal: wp(5),
//     borderWidth: 1,
//     borderColor: colors.lightShade,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//   },
//   searchbarInput: {
//     flex: 1,
//     paddingHorizontal: 10,
//     fontFamily: typography.regular,
//     marginBottom: -5,
//   },
// });
