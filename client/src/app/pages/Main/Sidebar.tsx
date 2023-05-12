import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ReactComponent as Logo } from "app/assets/svg/Logo.svg";
import { ReactComponent as Home } from "app/assets/svg/Home.svg";
import { ReactComponent as Star } from "app/assets/svg/Star.svg";
import { ReactComponent as Time } from "app/assets/svg/Time.svg";
import { ReactComponent as Fire } from "app/assets/svg/Fire.svg";
import { ReactComponent as Spade } from "app/assets/svg/Spade.svg";
import { ReactComponent as Rocket } from "app/assets/svg/Rocket.svg";
import { setMenu } from "app/store/modal.slice";
const Sidebar = () => {
  const dispatch = useDispatch();
  const menu = useSelector((state: any) => state.modal.menu);
  return (
    <>
      <div className="px-4 py-8 border-r border-border h-[100vh] hidden sm:flex flex-col items-center gap-4 fixed">
        <div>
          <Logo className="w-10 cursor-pointer" />
        </div>

        <div className="p-4 hover:bg-card anim rounded-2xl cursor-pointer mt-6">
          <Home className="w-5" />
        </div>
        <div className="p-4 hover:bg-card anim rounded-2xl cursor-pointer">
          <Star className="w-5" />
        </div>
        <div className="p-4 hover:bg-card anim rounded-2xl cursor-pointer">
          <Time className="w-5" />
        </div>
        <div className="p-4 hover:bg-card anim rounded-2xl cursor-pointer mt-6">
          <Fire className="w-5" />
        </div>
        <div className="p-4 hover:bg-card anim rounded-2xl cursor-pointer">
          <Spade className="w-5" />
        </div>
        <div className="p-4 border-border anim border rounded-2xl cursor-pointer">
          <Rocket className="w-5" />
        </div>
      </div>

      <div
        className={` left-0 p-4 h-[100vh] w-full z-20 bg-back flex flex-col items-center gap-2 fixed text-sm md:hidden ${
          menu
            ? "anim-in-sidebar opacity-100 left-0"
            : "anim-out-sidebar opacity-0 left-[-100%]"
        }`}
      >
        <div className="flex items-center justify-start gap-5 w-full mb-4 uppercase">
          <Logo className="w-10 cursor-pointer" />
          <div className="text-2xl font-semibold">
            <span className="text-indigo">DDog </span>Club
          </div>
          <div
            className="ml-auto text-3xl -mt-4 cursor-pointer"
            onClick={() => {
              dispatch(setMenu(false));
            }}
          >
            &times;
          </div>
        </div>

        <div className="px-6 py-2 hover:bg-card anim rounded-md w-full flex items-center gap-6 bg-card cursor-pointer">
          <Home className="w-4" />
          <div>Home</div>
        </div>
        <div className="px-6 py-2 hover:bg-card anim rounded-md w-full flex items-center gap-6 bg-card cursor-pointer">
          <Star className="w-4" />
          <div>Star</div>
        </div>
        <div className="px-6 py-2 hover:bg-card anim rounded-md w-full flex items-center gap-6 bg-card cursor-pointer">
          <Time className="w-4" />
          <div>History</div>
        </div>
        <div className="px-6 py-2 hover:bg-card anim rounded-md w-full flex items-center gap-6 bg-card cursor-pointer">
          <Fire className="w-4" />
          <div>Racing</div>
        </div>
        <div className="px-6 py-2 hover:bg-card anim rounded-md w-full flex items-center gap-6 bg-card cursor-pointer">
          <Spade className="w-4" />
          <div>Pocker</div>
        </div>
        <div className="px-6 py-2 hover:bg-card anim rounded-md w-full flex items-center gap-6 bg-indigoDark text-bright cursor-pointer">
          <Rocket className="w-4" />
          <div>Crash</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
