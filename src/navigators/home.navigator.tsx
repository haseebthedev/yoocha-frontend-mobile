import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "screens/Main/Home/home.screen";
import { colors } from "theme";
import { hp } from "utils/responsive";
import { isIOS } from "utils/deviceInfo";
import Ionicons from "react-native-vector-icons/Ionicons";

type NavigatorParamList = {
  home: undefined;
  contacts: undefined;
  profile: undefined;
};

const Tab = createBottomTabNavigator<NavigatorParamList>();

enum BottomTabIcon {
  home = "home-outline",
  contacts = "chatbubbles-outline",
  profile = "person-outline",
}

const BOTTOM_TAB_HEIGHT = isIOS ? hp(6.5) : hp(8);

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarIcon: ({ color, size }) => <Ionicons name={BottomTabIcon[route.name]} size={size} color={color} />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey,
        tabBarStyle: {
          height: BOTTOM_TAB_HEIGHT,
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
      initialRouteName="home"
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="contacts" component={HomeScreen} />
      <Tab.Screen name="profile" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export { HomeNavigator };
