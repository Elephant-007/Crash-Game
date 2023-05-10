import {
  getTimeState,
  startTimer,
  addPlayer,
  getPlayers,
  getWaitings,
  Cashout,
  addWaiting,
  removeWaitiong,
} from "./crashgame";
const socketProvider = (io: any) => {
  startTimer();
  io.on("connection", (socket: any) => {
    console.log("A user connected");
    var auth = {
      token: "",
      address: "",
      avatarUrl: "",
      name: "",
      balance: 0,
    };
    socket.emit("playerState", getPlayers());
    socket.emit("auth");
    socket.on("auth", (data: any) => {
      auth = data.auth;
      //------athentication-------
    });
    socket.on("bet", (data: any) => {
      if (data.address !== auth.address || data.address === "") return;
      addPlayer({
        ...auth,
        cashPoint: 0,
        cashTime: 0,
        betAmount: data.amount,
      });
    });
    socket.on("promise", (data: any) => {
      if (data.address !== auth.address || data.address === "") return;
      addWaiting({
        ...auth,
        cashPoint: 0,
        cashTime: 0,
        betAmount: data.amount,
      });
    });
    socket.on("cancelPromise", (data: any) => {
      if (data.address !== auth.address || data.address === "") return;
      removeWaitiong(data.address);
    });
    socket.on("cashOut", (data: any) => {
      if (data.address !== auth.address || data.address === "") return;
      Cashout(data.address, data.time, data.point);
    });
  });

  setInterval(() => {
    io.emit("stateInfo", {
      gameState: getTimeState(),
      playerState: getPlayers(),
      waitingState: getWaitings(),
    });
  }, 100);
};
export default socketProvider;
