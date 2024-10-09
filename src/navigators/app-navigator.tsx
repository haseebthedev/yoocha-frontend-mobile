import React, { useEffect, useRef, useCallback } from "react";
import { StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { navigationRef, useBackButtonHandler } from "./navigation-utilities";
import {
  MainScreen,
  UserMessagingScreen,
  BlockedUsersScreen,
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
  SearchPeopleScreen,
  PublicProfileScreen,
  ChangePasswordScreen,
  SendRequestsScreen,
  RecieveRequestsScreen,
} from "screens";
import { colors } from "theme";
import { ScreenEnum } from "enums";
import { disconnectSocketIO, initSocketIO } from "socket";
import { UserI, ListRoomItemI, RootState, useAppSelector } from "store";

export type NavigatorParamList = {
  main: undefined;
  home: undefined;
  contacts: undefined;
  profile: undefined;
  usermessaging: {
    roomId: string;
    item: ListRoomItemI;
  };
  blockedusers: undefined;
  sendrequests: undefined;
  recieverequests: undefined;
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
  searchPeople: undefined;
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
      initialRouteName={ScreenEnum.MAIN}
    >
      <Stack.Screen name={ScreenEnum.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={ScreenEnum.SIGN_UP} component={SignUpScreen} />
      <Stack.Screen name={ScreenEnum.MAIN} component={MainScreen} />
      <Stack.Screen name={ScreenEnum.NOTIFICATIONS} component={NotificationScreen} />
      <Stack.Screen name={ScreenEnum.SEARCH_PEOPLE} component={SearchPeopleScreen} />
      <Stack.Screen name={ScreenEnum.PUBLIC_PROFILE} component={PublicProfileScreen} />
      <Stack.Screen name={ScreenEnum.USER_MESSAGING} component={UserMessagingScreen} />
      <Stack.Screen name={ScreenEnum.BLOCKED_USERS} component={BlockedUsersScreen} />
      <Stack.Screen name={ScreenEnum.SEND_REQUESTS} component={SendRequestsScreen} />
      <Stack.Screen name={ScreenEnum.RECIEVED_REQUESTS} component={RecieveRequestsScreen} />
      <Stack.Screen name={ScreenEnum.EDIT_PROFILE} component={EditProfileScreen} />
      <Stack.Screen name={ScreenEnum.APP_SETTNGS} component={AppSettingsScreen} />
      <Stack.Screen name={ScreenEnum.CONTACT_US} component={ContactUsScreen} />
      <Stack.Screen name={ScreenEnum.CHANGE_PASSWORD} component={ChangePasswordScreen} />
      <Stack.Screen name={ScreenEnum.REPORT_ISSUE} component={ReportIssue} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      initialRouteName={ScreenEnum.SIGN_IN}
    >
      <Stack.Screen name={ScreenEnum.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={ScreenEnum.SIGN_UP} component={SignUpScreen} />
      <Stack.Screen name={ScreenEnum.OTP_VERIFICATION} component={OTPVerificationScreen} />
      <Stack.Screen name={ScreenEnum.FORGET_PASSWORD} component={ForgetPasswordScreen} />
      <Stack.Screen name={ScreenEnum.RESET_PASSWORD} component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const { token } = useAppSelector((state) => state.auth);

  useBackButtonHandler(canExit);

  const initializeSocket = useCallback(() => {
    if (token) {
      console.log("Initializing the client socket!");
      initSocketIO();
    }
  }, [token]);

  useEffect(() => {
    initializeSocket();

    return () => {
      disconnectSocketIO();
    };
  }, [initializeSocket]);

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
