import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeNavigator } from "./home.navigator";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "components";
import { colors } from "theme";

const Drawer = createDrawerNavigator();

function CustomDrawer({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Text>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Main">{() => <HomeNavigator />}</Drawer.Screen>
    </Drawer.Navigator>
  );
};

export { HomeDrawer };
