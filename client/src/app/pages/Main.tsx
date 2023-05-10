import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../config/axios";
import { setAuth } from "../store/auth.slice";
import Rocket from "../components/Rocket";
import UserTable from "../components/UserTable";
import { shortenName } from "../config/util";
import Action from "../components/Action";
import Sidebar from "../components/Sidebar";
import MyTable from "../components/MyTable";
import HistoryTable from "../components/HistoryTable";
import ContestTable from "../components/ContestTable";
import Modal from "react-modal";
const tabs = [
  { text: "My Bet", content: MyTable },
  { text: "History", content: HistoryTable },
  { text: "Contest", content: ContestTable },
];
const customStyles = {
  overlay: {
    backgroundColor: "rgba(14,18,36,.7)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#1B1B24",
    border: "none",
    color: "#6d6d8f",
    boxShadow: "5px 5px 8px 0px rgba(0, 0, 0, 0.295)",
  },
};
Modal.setAppElement("body");
const Main = () => {
  const [tabActive, setTabActive] = useState("My Bet");
  const [modalSignUp, setModalSignUp] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const handleLogin = async () => {
    const login = await axios.post("/login", {
      address: "erd12345678901234567890",
    });
    dispatch(setAuth({ token: login.data.token, ...login.data.user }));
  };
  const handleSignUp = () => {
    alert("signup");
  };
  return (
    <>
      <div className="flex text-secondary">
        <Sidebar></Sidebar>
        <div className="w-full ml-24 relative">
          <div className=" relative flex items-center p-8 px-10">
            <div className="m-rounded px-3 py-4 cursor-pointer anim hover:bg-card">
              <img className="w-6" src="/assets/svg/menu.svg"></img>
            </div>
            <div className="flex justify-center items-center ml-6 gap-2 uppercase text-xs">
              <div className="rounded-full w-1.5 h-1.5 bg-[#43E5AB]"></div>
              Network Status
            </div>
            <div className="my-auto ml-auto  text-sm  lg:text-base flex gap-2">
              {auth.token ? (
                <div className="flex justify-center items-center text-base font-semibold m-rounded px-6">
                  {auth.balance} ETH
                </div>
              ) : (
                <>
                  <button
                    className="m-rounded px-5 hover:bg-card anim"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <button
                    className="m-rounded px-5 hover:bg-card anim"
                    onClick={() => {
                      setModalSignUp(true);
                    }}
                  >
                    Sign Up
                  </button>
                </>
              )}
              <div className="m-rounded py-3.5 px-4 cursor-pointer anim hover:bg-card">
                <img src="/assets/svg/bell.svg" className="w-4"></img>
              </div>
            </div>
          </div>
          <div className="w-full relative px-12">
            <div className="lg:flex lg:gap-16">
              <div className=" lg:w-[60%]">
                <Rocket></Rocket>
                <Action></Action>
              </div>
              <div className=" lg:w-[40%]">
                <UserTable></UserTable>
              </div>
            </div>
          </div>
          {/* //--------Tab----------- */}
          <div className=" mt-20 relative px-10">
            <div className="flex item-center justify-center text-lg text-center relative">
              <img
                src="/images/shine.png"
                className="w-4/5 absolute left-[10%] z-[-2] bottom-0 "
              ></img>
              <div className="bottom-0 absolute bg-gradient-to-r from-[#fff0] via-[#fff1] to-[#fff0] h-0.5 w-full z-[-1]"></div>
              {tabs.map((item: any, id: number) => {
                return (
                  <div
                    className="w-60  cursor-pointer group anim"
                    key={"tabs" + id}
                    onClick={() => {
                      setTabActive(item.text);
                    }}
                  >
                    <div
                      className={
                        "p-4 " + (tabActive == item.text && "text-white")
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
                  <div id={"tab-content-" + id}>
                    {item.text === tabActive && <item.content></item.content>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Modal
        id="modalAuth"
        style={customStyles}
        isOpen={modalSignUp}
        onRequestClose={() => {
          setModalSignUp(false);
        }}
        contentLabel="Sign Up"
      >
        <div className="flex justify-between items-start">
          <h1 className="text-4xl text-white mt-3 uppercase font-semibold">
            Sign Up
          </h1>
          <div
            onClick={() => {
              setModalSignUp(false);
            }}
            className="text-xl hover:text-white anim cursor-pointer"
          >
            &times;
          </div>
        </div>
        <div>
          <button className="w-full mt-6 bg-card py-3 rounded-md hover:bg-border anim hover:text-white">
            Connect Wallet
          </button>
          <input
            className="mt-5 p-3 rounded-md bg-transparent outline-none text-white border-border border w-full placeholder:text-secondary"
            placeholder="Username"
          ></input>
          <div className="mt-5">
            <div className="w-32 mx-auto cursor-pointer h-32 border border-border rounded-full"></div>
          </div>

          <button className="w-full mt-5 bg-gradient-to-r from-[#5E5BF8] via-[#9750F3] to-[#57A9F4] py-3 rounded-md text-white hover:shadow-[0_0_12px_0px_#818cf850] anim">
            Sign Up
          </button>
        </div>
      </Modal>
    </>
  );
};
export default Main;
