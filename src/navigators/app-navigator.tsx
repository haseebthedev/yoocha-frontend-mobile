import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef, useBackButtonHandler } from "./navigation-utilities";
import { HomeScreen } from "screens";
import { colors } from "theme";

export type NavigatorParamList = {
  splash: undefined;
  home: undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      initialRouteName="home"
    >
      {/* <Stack.Screen name="splash" component={SplashScreen} /> */}
      <Stack.Screen name="home" component={HomeScreen} />
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
