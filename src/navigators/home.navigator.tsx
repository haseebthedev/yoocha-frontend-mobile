import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "theme";
import { hp } from "utils/responsive";
import { isIOS } from "utils/deviceInfo";
import { CustomHomeDrawer } from "components";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { HomeScreen } from "screens/Main/Home/home.screen";
import { ContactScreen } from "screens/Main/Contact/contact.screen";
import { ProfileScreen } from "screens/Main/Profile/profile.screen";

import Ionicons from "react-native-vector-icons/Ionicons";
import { RootState, useAppSelector } from "store";
import { useAppTheme } from "hooks";

export type AppNavigatorParamList = {
  home: undefined;
  contacts: undefined;
  profile: undefined;
};

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator<AppNavigatorParamList>();

enum BottomTabIcon {
  home = "home-outline",
  contacts = "chatbubbles-outline",
  profile = "person-outline",
}

const BOTTOM_TAB_HEIGHT = isIOS ? hp(6.5) : hp(6.5);

const HomeNavigator = () => {
  const { theme } = useAppTheme();

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
      <Drawer.Screen name="Main">
        {() => (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarButton: (props) => <TouchableOpacity {...props} />,
              tabBarIcon: ({ color, size }) => <Ionicons name={BottomTabIcon[route.name]} size={size} color={color} />,
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.grey,
              tabBarStyle: {
                height: BOTTOM_TAB_HEIGHT,
                backgroundColor: theme.colors.bgColor,
              },
              tabBarShowLabel: false,
              headerShown: false,
            })}
            initialRouteName="home"
          >
            <Tab.Screen name="home" component={HomeScreen} />
            <Tab.Screen name="contacts" component={ContactScreen} />
            <Tab.Screen name="profile" component={ProfileScreen} />
          </Tab.Navigator>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export { HomeNavigator };
