import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef, useBackButtonHandler } from "./navigation-utilities";
import { MainScreen, UserMessagingScreen, BlockedUsersScreen, SettingsScreen, EditProfileScreen, AppSettingsScreen } from "screens";
import { colors } from "theme";

export type NavigatorParamList = {
  main: undefined;
  home: undefined;
  contacts: undefined;
  profile: undefined;

  usermessaging: undefined;
  blockedusers: undefined
  settings: undefined
  editprofile: undefined
  appsettings: undefined
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      initialRouteName="main"
    >
      <Stack.Screen name="main" component={MainScreen} />
      <Stack.Screen name="usermessaging" component={UserMessagingScreen} />
      <Stack.Screen name="blockedusers" component={BlockedUsersScreen} />
      <Stack.Screen name="settings" component={SettingsScreen} />
      <Stack.Screen name="editprofile" component={EditProfileScreen} />
      <Stack.Screen name="appsettings" component={AppSettingsScreen} />
    </Stack.Navigator>
  );
};

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme();

  useBackButtonHandler(canExit);

  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <StatusBar translucent backgroundColor={colors.transparent} />
      <AppStack />
    </NavigationContainer>
  );
};

AppNavigator.displayName = "AppNavigator";

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = [""];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
