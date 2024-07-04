import { StyleSheet } from "react-native";
import { colors } from "theme";
import { hp, wp } from "utils/responsive";

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    map: {
      width: 300,
      height: 300,
      borderRadius: 10,
    },
    button: {
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
    openButton: {
      backgroundColor: "green",
      padding: 10,
      borderRadius: 5,
    },
  });

export default createStyles;
