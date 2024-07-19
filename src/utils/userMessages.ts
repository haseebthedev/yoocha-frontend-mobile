import { Dispatch } from "redux";
import { AnyAction } from "@reduxjs/toolkit";
import { sendMessageService } from "store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Message {
  roomId: string;
  message: string;
}

const saveMessageOffline = async (message: Message): Promise<void> => {
  try {
    let messages: Message[] = await AsyncStorage.getItem("offlineMessages").then((res) => (res ? JSON.parse(res) : []));
    messages.push(message);
    await AsyncStorage.setItem("offlineMessages", JSON.stringify(messages));
  } catch (error) {
    console.error("Error saving message offline", error);
  }
};

const sendStoredMessages = async (dispatch: Dispatch<AnyAction>): Promise<void> => {
  try {
    let messages: Message[] = await AsyncStorage.getItem("offlineMessages").then((res) => (res ? JSON.parse(res) : []));
    console.log("stored message === ", messages);
    for (const message of messages) {
      await dispatch(sendMessageService(message));
    }
    await AsyncStorage.removeItem("offlineMessages");
  } catch (error) {
    console.error("Error sending stored messages", error);
  }
};

export { sendStoredMessages, saveMessageOffline };
