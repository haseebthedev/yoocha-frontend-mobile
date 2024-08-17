import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";

export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";

export const getDeviceToken = async (): Promise<string | null> => {
  try {
    const fcmToken = await messaging().getToken();
    return fcmToken;
  } catch (error) {
    console.error("Failed to get FCM token:", error);
    return null;
  }
};
