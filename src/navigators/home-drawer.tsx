import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeNavigator } from "./home.navigator";
import { CustomHomeDrawer } from "components";

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "transparent",
        },
        drawerHideStatusBarOnOpen: true,
      }}
      drawerContent={CustomHomeDrawer as any}
    >
      <Drawer.Screen name="Main">{() => <HomeNavigator />}</Drawer.Screen>
    </Drawer.Navigator>
  );
};

export { HomeDrawer };
