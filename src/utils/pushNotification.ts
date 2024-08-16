import PushNotification from "react-native-push-notification";

export const configurePushNotifications = () => {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
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
    bigPictureUrl: imageUrl ? imageUrl : null,
    priority: "high",
  });
};

export const createChannel = (channelId: string, channelName: string, channelDescription: string) => {
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
};
