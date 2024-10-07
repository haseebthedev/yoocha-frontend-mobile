import { API_URL } from "config/config.dev";
import { Socket, io } from "socket.io-client";
import { loadString } from "utils/storage";

export var socket: Socket | null = null;

export const initSocketIO = async () => {
  const token = await loadString("UserToken");
  console.log("UserToken retrieved:", token);

  let extraHeaders = {};

  if (token) {
    extraHeaders["authorization"] = token ? token : null;
  }

  socket = io(API_URL, { transports: ["websocket"], extraHeaders });

  socket.on("connect", () => {
    console.log("Socket connected:", socket?.id);
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });
};

export const disconnectSocketIO = async () => {
  if (socket) {
    await socket.disconnect();
    console.log("Socket disconnected");
    return;
  }

  socket = null;
};
