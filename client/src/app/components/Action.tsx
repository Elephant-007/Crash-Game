import React, { useState } from "react";
import { useSelector } from "react-redux";
import { constStates } from "../config/const";
import { socketEvents } from "../socket/socket";
import NumberInput from "./NumberInput";

const Action = () => {
  const fixedBetAmount = 6;
  const minBetAmount = Number(0.00001);
  const maxBetAmount = 100;
  const [betAmount, setBetAmount] = useState(0.00001);
  const [autoCash, setAutoCash] = useState(100.0);
  const gameState = useSelector((state: any) => state.crash.gameState);
  const auth = useSelector((state: any) => state.auth);
  const players = useSelector((state: any) => state.crash.playerState);
  const me = players.find((player: any) => {
    return player.address === auth.address;
  });
  const waitings = useSelector((state: any) => state.crash.waitingState);
  const promise = waitings.find((player: any) => {
    return player.address === auth.address;
  });

  return (
    <div>
      <div className="flex mt-4 gap-1 ">
        <div className="relative w-full">
          <NumberInput
            onChange={(e: number) => {
              setBetAmount(e);
            }}
            min={minBetAmount}
            max={100}
            value={betAmount}
            className="w-full bg-back py-4 px-4 m-rounded text-[white] transition duration-300 outline-none"
          ></NumberInput>
        </div>
        <button className="bg-card w-14 outline-none rounded-2xl flex-none anim hover:bg-border">
          x2
        </button>
        <button className="bg-card w-14 outline-none rounded-2xl flex-none anim hover:bg-border">
          1/2
        </button>
        <button className="border border-border w-14 outline-none rounded-2xl flex-none hover:bg-card anim">
          ...
        </button>
        <div className="relative w-full">
          <NumberInput
            onChange={(e: number) => {
              setBetAmount(e);
            }}
            min={minBetAmount}
            max={100}
            value={betAmount}
            className="w-full bg-back py-4 px-4 m-rounded text-[white] transition duration-300 outline-none"
          ></NumberInput>
        </div>
        <button className="bg-card w-14 outline-none rounded-2xl flex-none flex items-center justify-center hover:bg-border anim">
          <img src="/assets/svg/key.svg"></img>
        </button>
      </div>
      <div className="mt-12 flex items-center justify-between ">
        <div className="flex items-center m-rounded cursor-pointer p-4 anim hover:bg-card">
          <img src="/assets/svg/Setting.svg" />
        </div>
        <button
          className="w-60 h-14 text-center justify-center flex items-center text-white rounded-full text-base relative transition-all duration-300 hover:shadow-[0_0_15px_5px_#818cf850]"
          onClick={() => {
            !auth.token
              ? alert("connect wallet")
              : gameState.state === constStates.loading && !me
              ? socketEvents.emitBet({
                  address: auth.address,
                  amount: 10,
                })
              : gameState.state === constStates.loading && me
              ? console.log("loading")
              : gameState.state === constStates.playing &&
                me &&
                me.cashPoint === 0
              ? socketEvents.emitCashOut({
                  address: auth.address,
                  time: gameState.time,
                  point: gameState.point,
                })
              : promise
              ? socketEvents.emitCancelPromise({ address: auth.address })
              : socketEvents.emitPromise({
                  address: auth.address,
                  amount: 10,
                });
          }}
        >
          <img
            src="/images/button.png"
            className=" absolute bg-cover inset-0 w-full h-full"
          ></img>
          <div className="relative">
            {!auth.token
              ? "DISABLE"
              : gameState.state === constStates.loading && !me
              ? "B E T"
              : gameState.state === constStates.loading && me
              ? "LOADING"
              : gameState.state === constStates.playing &&
                me &&
                me.cashPoint === 0
              ? "CASH OUT"
              : promise
              ? "LOADING (CANCEL)"
              : "BET (NEXT ROUND)"}
          </div>
        </button>
        <div className="flex items-center m-rounded cursor-pointer p-4  hover:bg-card anim">
          <img src="/assets/svg/screen.svg" />
        </div>
      </div>
    </div>
  );
};

export default Action;
