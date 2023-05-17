import { convertTime, convertPoint } from "../utils/timeConverter";
const states = {
  crash: "CRASH",
  loading: "LOADING",
  playing: "PLAYING",
};
const loadingTime = 6;
const crashTime = 4;
interface Player {
  address: string;
  name: string;
  avatar: string;
  cashPoint: number;
  cashTime: number;
  betAmount: number;
  chain: string;
}
var time = 0;
var state = states.loading;
var players: Player[] = [];
var waitings: Player[] = [];
var crashPoint = 13;

export const startTimer = () => {
  console.log("timer start");
  var timer = setInterval(() => {
    time += 0.1;
    if (state === states.loading && time > loadingTime) startGame();
    else if (state === states.playing && time > crashPoint) finishGame();
    else if (state === states.crash && time > crashTime) initGame();
  }, 100);
};
const initGame = () => {
  players = waitings;
  waitings = [];
  state = states.loading;
  time = 0;
};
const startGame = () => {
  state = states.playing;
  time = 0;
};
const finishGame = () => {
  state = states.crash;
  time = 0;
};
export const getTimeState = () => {
  return { time: convertTime(time), state, point: convertPoint(time) };
};
export const getPlayers = () => {
  return players;
};
export const getWaitings = () => {
  return waitings;
};
export const addPlayer = (player: Player) => {
  if (
    players.find((item) => {
      return item.address === player.address;
    })
  )
    return false;
  players.push(player);
  return true;
};

export const Cashout = (address: string, time: number, point: number) => {
  let me = players.find((item) => {
    return item.address === address;
  });
  if (!me) return false;
  if (me.cashPoint > 0) return false;
  if (point > crashPoint) return false;
  me.cashPoint = point;
  me.cashTime = time;
  return true;
};
export const addWaiting = (player: Player) => {
  if (
    waitings.find((item) => {
      return item.address === player.address;
    })
  )
    return false;
  waitings.push(player);
  return true;
};

export const removeWaitiong = (address: string) => {
  waitings = waitings.filter((item) => {
    return item.address !== address;
  });
  return true;
};
