import React from "react";
import { useSelector } from "react-redux";
import { shortenName } from "app/utils/util";
import { coinSVG, constStates } from "app/config/const";

const UserTable = () => {
  const gameState = useSelector((state: any) => state.crash.gameState);
  const players = useSelector((state: any) => state.crash.playerState);
  return (
    <div className="w-full h-[240px] relative">
      <table className="w-full text-sm" style={{ tableLayout: "fixed" }}>
        <thead>
          <tr className="uppercase text-xs">
            <th className="text-left font-[400] m-overflow w-[100px] w-[30%] py-1">
              User
            </th>
            <th className="text-left font-[400] m-overflow w-[100px] w-[30%] py-1 hidden md:block">
              Bet
            </th>
            <th className="text-left font-[400] m-overflow w-[100px] w-[25%] py-1">
              Cash Out
            </th>
            <th className="text-right font-[400] m-overflow w-[100px] w-[30%] py-1 hidden md:block">
              Profit
            </th>
            <th className="text-right font-[400] m-overflow w-[100px] w-[100%] py-1 block md:hidden">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player: any, id: any) => {
            const CoinIcon = coinSVG[player.chain];
            return (
              <tr
                key={"player" + id}
                className={` ${
                  player.cashPoint > 0
                    ? "text-[#34c2e6]"
                    : gameState.state === constStates.crash
                    ? "text-red-500"
                    : "text-[#4d555f]"
                }`}
              >
                <td className="py-1 pr-2 overflow-hidden">
                  <div className="flex items-center gap-1 w-full">
                    <img
                      src={player.avatar}
                      className="w-5 h-5 rounded-full border border-border flex-none"
                    />
                    <div className="m-overflow">{player.name}</div>
                  </div>
                </td>
                <td className="py-1 pr-2 hidden md:block">
                  <div className=" flex items-center gap-1 w-full">
                    <CoinIcon className="w-4 h-4 flex-none"></CoinIcon>
                    <div className="m-overflow">{player.betAmount}</div>
                  </div>
                </td>
                <td className="py-1 pr-2 m-overflow">
                  <div className="m-overflow">
                    {player.cashPoint ? "x " + player.cashPoint : "-"}
                  </div>
                </td>
                <td className="py-1 pl-2 text-right hidden md:block">
                  {player.cashPoint ? (
                    <div className=" flex items-center justify-end gap-1 w-full">
                      <CoinIcon className="w-4 h-4 flex-none"></CoinIcon>
                      <div className="m-overflow">
                        {(
                          Number(player.betAmount) * Number(player.cashPoint)
                        ).toFixed(8)}
                      </div>
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="py-1 pl-2 text-right">
                  {player.cashPoint ? (
                    <div className=" flex items-center justify-end gap-1 w-full">
                      <CoinIcon className="w-4 h-4 flex-none"></CoinIcon>
                      <div className="m-overflow">
                        {(
                          Number(player.betAmount) * Number(player.cashPoint)
                        ).toFixed(8)}
                      </div>
                    </div>
                  ) : (
                    <div className=" flex items-center justify-end gap-1 w-full">
                      <CoinIcon className="w-4 h-4 flex-none"></CoinIcon>
                      <div className="m-overflow">
                        {Number(player.betAmount).toFixed(8)}
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
