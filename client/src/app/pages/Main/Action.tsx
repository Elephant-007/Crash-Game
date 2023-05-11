import React, { useState } from "react";
import { useSelector } from "react-redux";
import { constStates } from "app/config/const";
import { socketEvents } from "app/providers/socket";
import NumberInput from "app/components/NumberInput";
import Iconify from "app/components/Iconify";

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
      <div className="flex flex-col mt-4 gap-3 ">
        <div className="flex gap-1">
          <div className="relative w-full">
            <NumberInput
              onChange={(e: number) => {
                setBetAmount(e);
              }}
              min={minBetAmount}
              max={100}
              value={betAmount}
              className="w-full bg-back py-3 md:py-4 px-4 m-rounded text-[white] transition duration-300 outline-none"
            ></NumberInput>
          </div>
          <button className="bg-card w-10 md:w-14 outline-none md:rounded-2xl rounded-lg flex-none anim hover:bg-border">
            x2
          </button>
          <button className="bg-card w-10 md:w-14 outline-none md:rounded-2xl rounded-lg flex-none anim hover:bg-border">
            1/2
          </button>
          <button className="border border-border w-10 md:w-14 outline-none md:rounded-2xl rounded-lg flex-none hover:bg-card anim">
            ...
          </button>
        </div>
        <div className="flex gap-1">
          <div className="relative w-full">
            <NumberInput
              onChange={(e: number) => {
                setBetAmount(e);
              }}
              min={minBetAmount}
              max={100}
              value={betAmount}
              className="w-full bg-back py-3 md:py-4 px-4 m-rounded text-[white] transition duration-300 outline-none"
            ></NumberInput>
          </div>
          <button className="bg-card w-10 md:w-14 outline-none md:rounded-2xl rounded-lg flex-none flex items-center justify-center hover:bg-border anim">
            <Iconify icon={"clarity:unlock-line"} className={"w-4 h-4"} />
          </button>
        </div>
      </div>
      <div className="md:mt-12 mt-6 flex items-center justify-between ">
        <div className="flex items-center m-rounded cursor-pointer md:p-4 p-3 anim hover:bg-card">
          <Iconify
            icon="ep:setting"
            className={" w-4 h-4 cursor-pointer"}
          ></Iconify>
        </div>
        <button
          className="md:py-3.5 md:min-w-[200px] min-w-[160px] py-3 px-10 text-center justify-center flex items-center bg-[url('app/assets/images/button.png')] bg-[length:100%_100%] text-white rounded-full text-xs md:text-base relative transition-all duration-300 hover:shadow-[0_0_15px_5px_#818cf850]"
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
        </button>
        <div className="flex items-center m-rounded cursor-pointer md:p-4 p-3  hover:bg-card anim">
          <Iconify
            icon="iconamoon:screen-full-thin"
            className={" w-4 h-4 cursor-pointer"}
          ></Iconify>
        </div>
      </div>
    </div>
  );
};

export default Action;
