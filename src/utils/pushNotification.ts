import { Platform } from "react-native";

import PushNotification from "react-native-push-notification";

import { ScreenEnum } from "enums";
import { navigationRef } from "../navigators/navigation-utilities";

export const configurePushNotifications = () => {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);

      navigationRef.current?.navigate(ScreenEnum.NOTIFICATIONS);

      if (notification.action === "Learn More") {
        // Navigate to the onboarding screen or show onboarding tips
        navigationRef.current?.navigate(ScreenEnum.HOME);
      } else if (notification.action === "Skip") {
        // Maybe log this or navigate elsewhere
      }
    },

    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
  });
};

export const showOnboardingNotification = (channelId) => {
  PushNotification.localNotification({
    channelId,
    title: "Welcome to Our App!",
    message: "Discover the best way to use our app. Tap to start your journey!",
    bigText: "Explore the features and get tips to make the most of our app. Tap to begin the onboarding.",
    color: "blue",
    smallIcon: "app_logo",
    largeIcon: "app_logo",
    priority: "high",
    // actions: '["Learn More", "Skip"]', // Only works on Android
    invokeApp: false, // Ensures the app isn't opened when notification is received
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
    bigPictureUrl: imageUrl
      ? imageUrl
      : "https://res.cloudinary.com/dbsd56hgh/image/upload/v1723895665/yoocha/wryjux3xjvjeopaysg6s.jpg",
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
