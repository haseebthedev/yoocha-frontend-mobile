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
import { createChannel, showLocalNotification, configurePushNotifications } from "./src/utils/pushNotification";

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
    showLocalNotification(remoteMessage, "yoocha-channel");
  });

  const setupMessagingHandlers = () => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("Message handled on foreground!", remoteMessage);
      showLocalNotification(remoteMessage, "yoocha-channel");
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
    configurePushNotifications();
    createChannel("yoocha-channel", "Yoocha Channel", "Notifications for yoocha app.");
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
    }, 1000);
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
