import { API_URL } from "config/config.dev";
import { Socket, io } from "socket.io-client";

export var socket: Socket | null = null;

export const initSocketIO = () => {
  socket = io(API_URL);
};

export const disconnectSocketIO = () => {
  if (socket) {
    socket.disconnect();
  }

  socket = null;
};
