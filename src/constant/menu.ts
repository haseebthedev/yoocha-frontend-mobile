import { MenuOptionsI } from "interfaces";
import { Alert } from "react-native";

export const contactScreenOptions: MenuOptionsI[] = [
  {
    id: 1,
    title: "Sent Requests",
    screenName: "sendrequests",
    onPress: () => {
      Alert.alert("Send Request");
    },
  },
  {
    id: 2,
    title: "Recieved Requests",
    screenName: "recieverequests",
    onPress: () => {
      Alert.alert("Recieve Request");
    },
  },
  {
    id: 3,
    title: "Blocked Users",
    screenName: "blockedusers",
    onPress: () => {
      Alert.alert("Blocked Users");
    },
  },
];

export const userMessageScreenOptions: MenuOptionsI[] = [
  {
    id: 1,
    title: "Block user",
    screenName: "",
  },
];
