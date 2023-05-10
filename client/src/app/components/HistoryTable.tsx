import React from "react";

const HistoryTable = () => {
  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="uppercase">
          <th className="text-left font-[400] uppercase">Game Id</th>
          <th className="text-left font-[400] uppercase">User Id</th>
          <th className="text-left font-[400] uppercase">Cash Out</th>
          <th className="text-left font-[400] uppercase">Bonus</th>
          <th className="text-right font-[400] uppercase">Result</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default HistoryTable;
