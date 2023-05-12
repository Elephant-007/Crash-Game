import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Iconify from "./Iconify";
import { coinSVG } from "app/config/const";
import { setChain } from "app/store/modal.slice";

export default function Dropdown(props: any) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const auth = useSelector((state: any) => state.auth);
  const chain = useSelector((state: any) => state.modal.chain);
  const MainCoin = coinSVG[chain];
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <div onClick={toggleDropdown}>
        <div className="flex justify-center items-center  font-semibold m-rounded py-2 px-3 gap-2 text-xs cursor-pointer">
          <MainCoin className="w-6 h-6"></MainCoin>
          <div className="flex gap-1">
            {auth.user.balance[chain]} <div className="uppercase">{chain}</div>
          </div>
          <Iconify
            icon={"material-symbols:keyboard-arrow-down-rounded"}
            className={"w-5 h-5 text-white"}
          ></Iconify>
        </div>
      </div>
      {isOpen && (
        <div
          className={`absolute top-[110%] right-0  bg-border rounded-md z-10 py-2 shadow-md anim-dropdown gap-2 flex flex-col min-w-[150px]`}
        >
          <div className="flex items-center gap-2  px-2 py-1">
            <img
              src={auth.user.avatar}
              className="w-6 h-6 rounded-full border border-secondary"
            />
            <div className="text-indigo">{auth.user.name}</div>
          </div>
          <div className="border-t border-indigo/10 mx-3"></div>
          <div className=" h-[160px] overflow-y-auto mr-1">
            {Object.keys(auth.user.balance).map((currency: any) => {
              const CoinIcon = coinSVG[currency];
              return (
                <div
                  key={currency}
                  className={`flex py-1 px-2 gap-2 text-xs items-center cursor-pointer ${
                    currency === chain
                      ? "text-bright bg-indigo/10"
                      : " hover:bg-indigo/5"
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                    dispatch(setChain(currency));
                  }}
                >
                  <CoinIcon className="w-6 h-6"></CoinIcon>
                  <div>{auth.user.balance[currency]}</div>
                  <div className="uppercase">{currency}</div>
                </div>
              );
            })}
          </div>
          <div className="border-b border-indigo/10 mx-3"></div>
          <div
            className="flex gap-2  items-center hover:bg-indigo/5 px-2 py-1 cursor-pointer text-sm"
            onClick={props.handleLogout}
          >
            <Iconify icon={"humbleicons:logout"} className="w-6 h-6" />
            <div>Logout</div>
          </div>
        </div>
      )}
    </div>
  );
}
