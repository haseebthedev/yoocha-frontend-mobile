import { MenuOptionI } from "interfaces";
import { navigate } from "navigators";

export const contactScreenOptions: MenuOptionI[] = [
  {
    id: 1,
    title: "Sent Requests",
    onPress: () => navigate("sendrequests"),
  },
  {
    id: 2,
    title: "Recieved Requests",
    onPress: () => navigate("recieverequests"),
  },
  {
    id: 3,
    title: "Blocked Users",
    onPress: () => navigate("blockedusers"),
  },
];

export const userMessageScreenOptions: MenuOptionI[] = [
  {
    id: 1,
    title: "Block user",
  },
];
