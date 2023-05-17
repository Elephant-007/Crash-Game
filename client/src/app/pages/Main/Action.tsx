import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { coinSVG, constStates } from "app/config/const";
import { socketEvents } from "app/providers/socket";
import NumberInput from "app/components/NumberInput";
import Iconify from "app/components/Iconify";
import html2canvas from "html2canvas";
import { setScreenshot } from "app/store/modal.slice";
import { ToastrContext } from "app/providers/ToastrProvider";

const Action = (props: any) => {
  const dispatch = useDispatch();
  const notify = useContext(ToastrContext);
  const chain = useSelector((state: any) => state.modal.chain);
  const fixedBetAmount = 8;
  const maxBetAmount = useSelector(
    (state: any) => state.auth.user.balance[chain]
  );
  const minBetAmount = Math.min(Number(0.00000001), Number(maxBetAmount));
  const [betAmount, setBetAmount] = useState(minBetAmount.toFixed(8));
  const [autoCash, setAutoCash] = useState((1.01).toFixed(2));
  const [isAutoCash, setIsAutoCash] = useState(false);
  const gameState = useSelector((state: any) => state.crash.gameState);
  const auth = useSelector((state: any) => state.auth);
  const players = useSelector((state: any) => state.crash.playerState);
  const me = players.find((player: any) => {
    return player.address === auth.user.address;
  });
  const waitings = useSelector((state: any) => state.crash.waitingState);
  const promise = waitings.find((player: any) => {
    return player.address === auth.user.address;
  });
  const MainCoin = coinSVG[chain];
  useEffect(() => {
    setBetAmount(
      Math.min(Number(minBetAmount), Number(maxBetAmount)).toFixed(8)
    );
    return () => {};
  }, [maxBetAmount]);

  const handlePrint = () => {
    html2canvas(props.target.current)
      .then((canvas) => {
        const screenshotDataUrl = canvas.toDataURL("image/png");
        dispatch(setScreenshot(screenshotDataUrl));
      })
      .catch((error) => {
        console.error("Error capturing screenshot:", error);
      });
  };
  return (
    <div>
      <div className="flex flex-col mt-4 gap-3 ">
        <div className="flex gap-1">
          <div className="relative w-full">
            <div className="absolute flex items-center h-full left-2.5">
              <MainCoin className="w-6 h-6" />
            </div>
            <NumberInput
              onChange={(e: any) => {
                setBetAmount(e);
              }}
              onBlur={() => {
                const filterValue: any = Math.min(
                  Math.max(Number(betAmount), Number(minBetAmount)),
                  Number(maxBetAmount)
                );
                setBetAmount(filterValue.toFixed(fixedBetAmount));
              }}
              min={minBetAmount}
              max={maxBetAmount}
              value={betAmount}
              fixed={fixedBetAmount}
              className="w-full bg-back py-3 md:py-4 pr-4 pl-10 m-rounded text-[white] transition duration-300 outline-none"
            ></NumberInput>
          </div>
          <button
            onClick={() => {
              setBetAmount(
                Math.min(Number(betAmount) * 2, maxBetAmount).toFixed(8)
              );
            }}
            className="bg-card w-10 md:w-14 outline-none md:rounded-2xl rounded-lg flex-none anim hover:bg-border"
          >
            x2
          </button>
          <button
            onClick={() => {
              setBetAmount(
                Math.max(Number(betAmount) / 2, minBetAmount).toFixed(8)
              );
            }}
            className="bg-card w-10 md:w-14 outline-none md:rounded-2xl rounded-lg flex-none anim hover:bg-border"
          >
            1/2
          </button>
        </div>
        <div className="flex gap-1">
          <div className="relative w-full">
            <NumberInput
              onChange={(e: any) => {
                setAutoCash(e);
              }}
              onBlur={() => {
                const filterValue: any = Math.max(Number(autoCash), 1.01);
                setAutoCash(filterValue.toFixed(2));
              }}
              min={1.01}
              value={autoCash}
              fixed={2}
              disabled={!isAutoCash}
              className={`w-full bg-back py-3 md:py-4 px-4 m-rounded text-[white] transition duration-300 outline-none disabled:text-secondary`}
            ></NumberInput>
          </div>
          <button
            onClick={() => {
              setIsAutoCash(!isAutoCash);
            }}
            className="bg-card w-10 md:w-14 outline-none md:rounded-2xl rounded-lg flex-none flex items-center justify-center hover:bg-border anim"
          >
            {isAutoCash ? (
              <Iconify icon={"clarity:unlock-line"} className={"w-4 h-4"} />
            ) : (
              <Iconify icon={"clarity:lock-line"} className={"w-4 h-4"} />
            )}
          </button>
        </div>
      </div>
      <div className="md:mt-12 mt-6 flex items-center justify-between ">
        <div className="flex items-center m-rounded cursor-pointer md:p-4 p-3 anim hover:bg-card">
          <Iconify
            icon="solar:chart-2-linear"
            className={" w-4 h-4 cursor-pointer"}
          ></Iconify>
        </div>
        <button
          className="md:py-3.5 md:min-w-[200px] min-w-[160px] py-3 px-10 text-center justify-center flex items-center bg-[url('app/assets/images/button.png')] bg-[length:100%_100%] text-white rounded-full text-xs md:text-base relative transition-all duration-300 hover:shadow-[0_0_15px_5px_#818cf850]"
          onClick={() => {
            !auth.token
              ? notify.error("Please login!")
              : gameState.state === constStates.loading && !me
              ? socketEvents.emitBet({
                  address: auth.user.address,
                  amount: betAmount,
                  chain,
                })
              : gameState.state === constStates.loading && me
              ? console.log("loading")
              : gameState.state === constStates.playing &&
                me &&
                me.cashPoint === 0
              ? socketEvents.emitCashOut({
                  address: auth.user.address,
                  time: gameState.time,
                  point: gameState.point,
                })
              : promise
              ? socketEvents.emitCancelPromise({ address: auth.user.address })
              : socketEvents.emitPromise({
                  address: auth.user.address,
                  amount: betAmount,
                  chain,
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
        <div
          className="flex items-center m-rounded cursor-pointer md:p-4 p-3  hover:bg-card anim"
          onClick={handlePrint}
        >
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
