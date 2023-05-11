import { useDispatch, useSelector } from "react-redux";
import { setSignUp } from "app/store/modal.slice";
import Iconify from "app/components/Iconify";
import { ReactComponent as Logo } from "app/assets/svg/Logo.svg";

const Navbar = () => {
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      <div className=" relative flex items-center md:py-8 md:px-10 px-4 py-4">
        <div className="m-rounded px-3 py-4 cursor-pointer anim hover:bg-card mr-6 md:block hidden ">
          <Iconify
            icon="material-symbols:menu-rounded"
            className={" w-6 h-6 cursor-pointer"}
          ></Iconify>
        </div>
        <div className="flex justify-center items-center gap-2 uppercase text-xs">
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
                className="m-rounded px-5 py-2 text-xs md:text-base hover:bg-card anim"
                // onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="m-rounded px-5 py-2 text-xs md:text-base hover:bg-indigoBright anim bg-indigo text-white "
                onClick={() => {
                  dispatch(setSignUp(true));
                }}
              >
                Sign Up
              </button>
            </>
          )}
          <div className="m-rounded py-3.5 px-4 cursor-pointer anim hover:bg-card hidden md:block">
            <Iconify
              icon="mdi:bell-outline"
              className={" w-6 h-6 cursor-pointer"}
            ></Iconify>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between fixed bottom-0 w-full left-0 bg-card z-10 pt-2.5 pb-1.5 px-4 shadow-[0_0_20px_4px_#0004]">
        <div className="flex items-center justify-center gap-0.5 flex-none text-[10px] flex-col">
          <Iconify
            icon="material-symbols:menu-rounded"
            className={" w-5 h-5 cursor-pointer"}
          ></Iconify>
          <div>Menu</div>
        </div>
        <div className="flex items-center justify-center gap-0.5 flex-none text-[10px] flex-col">
          <Iconify
            icon="ep:setting"
            className={" w-5 h-5 cursor-pointer"}
          ></Iconify>
          <div>Setting</div>
        </div>
        <div className="px-8"></div>
        <div className="p-3 bg-card absolute left-[50%] top-[-12px] translate-x-[-50%] rounded-full">
          <Logo className=" w-10 h-10 "></Logo>
        </div>
        <div className="flex items-center justify-center gap-0.5 flex-none text-[10px] flex-col">
          <Iconify
            icon="mdi:bell-outline"
            className={" w-5 h-5 cursor-pointer"}
          ></Iconify>
          <div>News</div>
        </div>
        <div className="flex items-center justify-center gap-0.5 flex-none text-[10px] flex-col">
          <Iconify
            icon="heroicons-outline:chat"
            className={" w-5 h-5 cursor-pointer"}
          ></Iconify>
          <div>Chat</div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
