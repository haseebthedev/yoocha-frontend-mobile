import { useEffect } from "react";
import { Text, View } from "react-native";
import BootSplash from "react-native-bootsplash";

const HomeScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      BootSplash.hide();
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, color: "black" }}>This is home page</Text>
    </View>
  );
};

export { HomeScreen };
