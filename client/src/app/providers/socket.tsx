import React from "react";
import { io, Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import environment from "../config";
import { setGameState } from "../store/crash.slice";

const socket: Socket = io(environment.socket);
export const socketEvents = {
  emitAuth: (data: any) => {
    socket.emit("auth", data);
  },
  emitBet: (data: any) => {
    socket.emit("bet", data);
  },
  emitPromise: (data: any) => {
    socket.emit("promise", data);
  },
  emitCancelPromise: (data: any) => {
    socket.emit("cancelPromise", data);
  },
  emitCashOut: (data: any) => {
    socket.emit("cashOut", data);
  },
};
const SocketProvider = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  socket.on("auth", () => {
    socketEvents.emitAuth({ auth });
  });
  socket.on("stateInfo", (data: any) => {
    dispatch(setGameState(data));
  });
  return <></>;
};

export default SocketProvider;
