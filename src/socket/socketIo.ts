import { API_URL } from "config/config.dev";
import { Socket, io } from "socket.io-client";
import { loadString } from "utils/storage";

export var socket: Socket | null = null;

export const initSocketIO = async () => {
  const token = await loadString("UserToken");

  let extraHeaders = {};

  if (token) {
    extraHeaders["authorization"] = token ? token : null;
  }

  socket = io(API_URL, { transports: ["websocket"], extraHeaders });
};

export const disconnectSocketIO = () => {
  if (socket) {
    socket.disconnect();
  }

  socket = null;
};
