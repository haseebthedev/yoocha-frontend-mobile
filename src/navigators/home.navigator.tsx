import React from "react";
import { TouchableOpacity } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { hp } from "utils/responsive";
import { isIOS } from "utils/deviceInfo";
import { ScreenEnum } from "enums";
import { useAppTheme } from "hooks";
import { CustomHomeDrawer } from "components";
import { ContactScreen, HomeScreen, ProfileScreen } from "screens";

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
              tabBarActiveTintColor: theme.colors.primary,
              tabBarInactiveTintColor: theme.colors.iconColor,
              tabBarStyle: {
                height: BOTTOM_TAB_HEIGHT,
                backgroundColor: theme.colors.bgColor,
                borderTopColor: theme.colors.borderColor,
              },
              tabBarShowLabel: false,
              headerShown: false,
            })}
            initialRouteName="home"
          >
            <Tab.Screen name={ScreenEnum.HOME} component={HomeScreen} />
            <Tab.Screen name={ScreenEnum.CONTACTS} component={ContactScreen} />
            <Tab.Screen name={ScreenEnum.PROFILE} component={ProfileScreen} />
          </Tab.Navigator>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export { HomeNavigator };
