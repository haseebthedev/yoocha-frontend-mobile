import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import messaging from "@react-native-firebase/messaging";
import BootSplash from "react-native-bootsplash";
import FlashMessage from "react-native-flash-message";

import { ScreenEnum } from "./src/enums";
import { persistor, store } from "./src/store/store";
import { AppNavigator, navigationRef } from "./src/navigators";
import {
  createChannel,
  showLocalNotification,
  showOnboardingNotification,
  configurePushNotifications,
} from "./src/utils/pushNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  const checkFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem("hasLaunchedApp");

      if (hasLaunched === null) {
        await AsyncStorage.setItem("hasLaunchedApp", "true");
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error checking first launch: ", error);
      return false;
    }
  };

  // Initialize channels and handle notifications on first launch
  const initializeApp = async () => {
    try {
      const isFirstLaunch = await checkFirstLaunch();

      if (isFirstLaunch) {
        createChannel("onboarding-channel", "Onboarding Channel", "Notifications for onboarding");
        showOnboardingNotification("onboarding-channel");
      }

      createChannel("friend-request-channel", "Friend Request Channel", "Notifications for friend requests");
    } catch (error) {
      console.error("Failed to initialize the app: ", error);
    }
  };

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
    showLocalNotification(remoteMessage, "friend-request-channel");
  });

  // Subscribe to message events
  const setupMessagingHandlers = () => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("Received message: ", remoteMessage);
      showLocalNotification(remoteMessage, "friend-request-channel");
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("Notification opened from background state: ", remoteMessage.notification);
      navigationRef.current?.navigate(ScreenEnum.NOTIFICATIONS);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("Notification opened from quit state: ", remoteMessage.notification);
          navigationRef.current?.navigate(ScreenEnum.NOTIFICATIONS);
        }
      });

    return unsubscribe;
  };

  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    configurePushNotifications();
  }, []);

  useEffect(() => {
    initializeApp();
  }, []);

  useEffect(() => {
    const unsubscribe = setupMessagingHandlers();

    return () => {
      unsubscribe();
    };
  }, []);

  // Hiding splash screen
  useEffect(() => {
    setTimeout(() => {
      BootSplash.hide();
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle={"dark-content"} />
        <AppNavigator />
        <FlashMessage position="bottom" style={{ marginTop: 20 }} />
      </PersistGate>
    </Provider>
  );
};

export default App;
