import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef, useBackButtonHandler } from "./navigation-utilities";
import {
  MainScreen,
  UserMessagingScreen,
  BlockedUsersScreen,
  SettingsScreen,
  EditProfileScreen,
  AppSettingsScreen,
  SignInScreen,
  SignUpScreen,
  OTPVerificationScreen,
  ForgetPasswordScreen,
  ResetPasswordScreen,
  ContactUsScreen,
  ReportIssue,
  NotificationScreen,
  SuggestionsScreen,
  PublicProfileScreen,
  ChangePasswordScreen,
} from "screens";
import { colors } from "theme";
import { SUGGESTED_USER_DATA_I } from "constant";
import { RootState, useAppSelector } from "../store/store";

export type NavigatorParamList = {
  main: undefined;
  home: undefined;
  contacts: undefined;
  profile: undefined;

  usermessaging: undefined;
  blockedusers: undefined;
  settings: undefined;
  editprofile: undefined;
  appsettings: undefined;

  signin: undefined;
  signup: undefined;
  otpVerification: undefined;
  forgetPassword: undefined;
  resetPassword: undefined;
  contactUs: undefined;
  reportIssue: undefined;
  notifications: undefined;
  suggestions: undefined;
  publicProfile: { item: SUGGESTED_USER_DATA_I };
  changePassword: undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const AppStack = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  // user?.isEmailVerified
  if (user) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        initialRouteName="main"
      >
        <Stack.Screen name="main" component={MainScreen} />
        <Stack.Screen name="notifications" component={NotificationScreen} />
        <Stack.Screen name="suggestions" component={SuggestionsScreen} />
        <Stack.Screen name="publicProfile" component={PublicProfileScreen} />
        <Stack.Screen name="usermessaging" component={UserMessagingScreen} />
        <Stack.Screen name="blockedusers" component={BlockedUsersScreen} />
        <Stack.Screen name="settings" component={SettingsScreen} />
        <Stack.Screen name="editprofile" component={EditProfileScreen} />
        <Stack.Screen name="appsettings" component={AppSettingsScreen} />
        <Stack.Screen name="contactUs" component={ContactUsScreen} />
        <Stack.Screen name="changePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="reportIssue" component={ReportIssue} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        initialRouteName="signin"
      >
        <Stack.Screen name="signup" component={SignUpScreen} />
        <Stack.Screen name="signin" component={SignInScreen} />
        <Stack.Screen name="otpVerification" component={OTPVerificationScreen} />
        <Stack.Screen name="forgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="resetPassword" component={ResetPasswordScreen} />
      </Stack.Navigator>
    );
  }
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
