import { useState } from "react";
import Rocket from "./Rocket";
import UserTable from "./UserTable";
import Action from "./Action";
import Sidebar from "./Sidebar";
import MyTable from "./MyTable";
import HistoryTable from "./HistoryTable";
import ContestTable from "./ContestTable";

import Navbar from "./Navbar";
const tabs = [
  { text: "My Bet", content: MyTable },
  { text: "History", content: HistoryTable },
  { text: "Contest", content: ContestTable },
];
const Main = () => {
  const [tabActive, setTabActive] = useState("My Bet");

  return (
    <>
      <div className="flex text-secondary text-xs md:base">
        <Sidebar></Sidebar>
        <div className="w-full md:ml-24">
          <Navbar></Navbar>
          <div className="w-full relative md:px-12 px-4">
            <div className="lg:flex lg:gap-16">
              <div className="lg:w-[60%]">
                <Rocket></Rocket>
                <Action></Action>
              </div>
              <div className="lg:w-[40%] mt-6 md:mt-0">
                <UserTable></UserTable>
              </div>
            </div>
          </div>
          {/* //--------Tab----------- */}
          <div className="mt-8 md:mt-20 relative md:px-10 px-4">
            <div className="flex item-center justify-center md:text-lg text-sm text-center relative">
              <img
                src="/images/shine.png"
                className="w-4/5 absolute left-[10%] z-[-2] bottom-0 "
              ></img>
              <div className="bottom-0 absolute bg-gradient-to-r from-[#fff0] via-[#fff1] to-[#fff0] h-0.5 w-full z-[-1]"></div>
              {tabs.map((item: any, id: number) => {
                return (
                  <div
                    className="md:w-60  cursor-pointer group anim"
                    key={"tabs" + id}
                    onClick={() => {
                      setTabActive(item.text);
                    }}
                  >
                    <div
                      className={
                        "p-3 md:p-4 " + (tabActive == item.text && "text-white")
                      }
                    >
                      {item.text}
                    </div>
                    <div
                      className={
                        (tabActive == item.text
                          ? "bg-gradient-to-r from-[#5E5BF8] via-[#9750F3] to-[#57A9F4]"
                          : "bg-transparent group-hover:bg-[#fff2]") +
                        " h-0.5 w-full anim"
                      }
                    ></div>
                  </div>
                );
              })}
            </div>
            <div className="py-10 min-h-[400px]">
              {tabs.map((item, id) => {
                return (
                  <div key={"tab-content-" + id}>
                    {item.text === tabActive && <item.content></item.content>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
