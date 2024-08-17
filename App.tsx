import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StatusBar } from "react-native";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import BootSplash from "react-native-bootsplash";
import FlashMessage from "react-native-flash-message";
import messaging from "@react-native-firebase/messaging";

import { AppNavigator, navigationRef } from "./src/navigators";
import { persistor, store } from "./src/store/store";
import { configurePushNotifications, createChannel, showLocalNotification } from "./src/utils/pushNotification";
import { ScreenEnum } from "./src/enums";

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

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);

    showLocalNotification(remoteMessage, "friend-request-channel");
  });

  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    configurePushNotifications();
  }, []);

  useEffect(() => {
    createChannel("friend-request-channel", "Friend Request Channel", "Notifications for friend requests");
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("remoteMessage === ", remoteMessage);
      showLocalNotification(remoteMessage, "friend-request-channel");
    });

    // Handle messages when the app is opened from a background state
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("Notification caused app to open from background state:", remoteMessage.notification);
      // Navigate to the screen related to the notification
    });

    // Handle messages when the app is opened from a quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("Notification caused app to open from quit state:", remoteMessage.notification);
          // navigationRef.current?.navigate(ScreenEnum.NOTIFICATIONS);
        }
      });

    return unsubscribe;
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
