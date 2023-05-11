import React from "react";
import { useSelector } from "react-redux";
import { shortenName } from "app/utils/util";
import { constStates } from "app/config/const";

const UserTable = () => {
  const gameState = useSelector((state: any) => state.crash.gameState);
  const players = useSelector((state: any) => state.crash.playerState);
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="uppercase text-xs">
          <th className="text-left font-[400]">User</th>
          <th className="text-center font-[400]">Bet</th>
          <th className="text-center font-[400]">Cash Out</th>
          <th className="text-center font-[400]">Bonus</th>
          <th className="text-right font-[400]">Profit</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player: any, id: any) => {
          return (
            <tr
              key={"player" + id}
              className={`${
                player.cashPoint > 0
                  ? "text-[#34c2e6]"
                  : gameState.state === constStates.crash
                  ? "text-red-500"
                  : "text-[#4d555f]"
              }`}
            >
              <td className="text-left">{shortenName(player.address)}</td>
              <td className="text-center">{player.betAmount}</td>
              <td className="text-center">{player.cashPoint}</td>
              <td className="text-right">
                {player.betAmount * player.cashPoint}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserTable;
