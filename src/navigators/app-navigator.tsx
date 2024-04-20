import React, { useEffect } from "react";
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
  SendRequestsScreen,
  RecieveRequestsScreen,
} from "screens";
import { colors } from "theme";
import { ListRoomItemI, RootState, UserI, useAppSelector } from "store";
import { disconnectSocketIO, initSocketIO } from "socket";

export type NavigatorParamList = {
  main: undefined;
  home: undefined;
  contacts: undefined;
  profile: undefined;

  usermessaging: {
    roomId: string;
    friendName: string;
    item: ListRoomItemI;
  };

  blockedusers: undefined;
  sendrequests: undefined;
  recieverequests: undefined;
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
  publicProfile: { item: UserI };
  changePassword: undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const AppStack = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return user?._id ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      initialRouteName="main"
    >
      <Stack.Screen name="signin" component={SignInScreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />

      <Stack.Screen name="main" component={MainScreen} />
      <Stack.Screen name="notifications" component={NotificationScreen} />
      <Stack.Screen name="suggestions" component={SuggestionsScreen} />
      <Stack.Screen name="publicProfile" component={PublicProfileScreen} />
      <Stack.Screen name="usermessaging" component={UserMessagingScreen} />
      <Stack.Screen name="blockedusers" component={BlockedUsersScreen} />
      <Stack.Screen name="sendrequests" component={SendRequestsScreen} />
      <Stack.Screen name="recieverequests" component={RecieveRequestsScreen} />
      <Stack.Screen name="settings" component={SettingsScreen} />
      <Stack.Screen name="editprofile" component={EditProfileScreen} />
      <Stack.Screen name="appsettings" component={AppSettingsScreen} />
      <Stack.Screen name="contactUs" component={ContactUsScreen} />
      <Stack.Screen name="changePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="reportIssue" component={ReportIssue} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      initialRouteName="signin"
    >
      <Stack.Screen name="signin" component={SignInScreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />
      <Stack.Screen name="otpVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="forgetPassword" component={ForgetPasswordScreen} />
      <Stack.Screen name="resetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme();

  const { token } = useAppSelector((state) => state.auth);

  useBackButtonHandler(canExit);

  useEffect(() => {
    if (token) {
      initSocketIO();
    }

    return () => {
      disconnectSocketIO();
    };
  }, [token]);

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
