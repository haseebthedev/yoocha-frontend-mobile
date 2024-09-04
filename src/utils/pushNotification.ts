import { Platform } from "react-native";

import PushNotification from "react-native-push-notification";

import { ScreenEnum } from "enums";
import { navigationRef } from "../navigators/navigation-utilities";

export const configurePushNotifications = () => {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);

      navigationRef.current?.navigate(ScreenEnum.NOTIFICATIONS);
    },

    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
  });
};

export const showLocalNotification = (remoteMessage, channelId: string) => {
  const title = remoteMessage.notification?.title || "New Notification";
  const message = remoteMessage.notification?.body || "Notification";
  const imageUrl = remoteMessage.notification?.android?.imageUrl || null;
  const color = remoteMessage.notification?.android?.color || "blue";

  PushNotification.localNotification({
    channelId,
    title,
    message,
    bigText: message,
    color: color,
    smallIcon: "app_logo",
    largeIcon: imageUrl ? imageUrl : "app_logo",
    priority: "high",
    autoCancel: true,
  });
};

export const createChannel = (channelId: string, channelName: string, channelDescription: string) => {
  if (Platform.OS === "android") {
    PushNotification.createChannel(
      {
        channelId,
        channelName,
        channelDescription,
        playSound: true,
        soundName: "default",
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
  }
};
