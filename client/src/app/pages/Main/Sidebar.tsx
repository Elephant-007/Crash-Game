const Sidebar = () => {
  return (
    <>
      <div className="px-4 py-8 border-r border-border h-[100vh] hidden sm:flex flex-col items-center gap-4 fixed">
        <div>
          <img src="/assets/svg/logo.svg" className="w-10 cursor-pointer" />
        </div>

        <div className="p-4 border-border hover:bg-card anim rounded-2xl cursor-pointer mt-6">
          <img src="/assets/svg/home.svg" className="w-5" />
        </div>
        <div className="p-4 border-border hover:bg-card anim rounded-2xl cursor-pointer">
          <img src="/assets/svg/star.svg" className="w-5" />
        </div>
        <div className="p-4 border-border hover:bg-card anim rounded-2xl cursor-pointer">
          <img src="/assets/svg/time.svg" className="w-5" />
        </div>
        <div className="p-4 border-border hover:bg-card anim rounded-2xl cursor-pointer mt-6">
          <img src="/assets/svg/fire.svg" className="w-5" />
        </div>
        <div className="p-4 border-border hover:bg-card anim rounded-2xl cursor-pointer">
          <img src="/assets/svg/spade.svg" className="w-5" />
        </div>
        <div className="p-4 border-border anim border rounded-2xl cursor-pointer">
          <img src="/assets/svg/rocket.svg" className="w-5" />
        </div>
      </div>

      <div className="p-4 h-[100vh] w-full z-20 bg-back flex flex-col items-center gap-4 fixed text-base">
        <div className="flex items-center justify-start gap-5 w-full">
          <img src="/assets/svg/logo.svg" className="w-10 cursor-pointer" />
          <div className="text-2xl font-semibold">
            <span className="text-indigoBright">DDog </span>Club
          </div>
        </div>

        <div className="px-6 py-2 border border-border hover:bg-card anim rounded-md w-full flex items-center gap-6 bg-card cursor-pointer mt-6">
          <img src="/assets/svg/home.svg" className="w-5" />
          <div>Home</div>
        </div>
        {/* <div className="p-4 border-border hover:bg-card anim rounded-2xl cursor-pointer">
          <img src="/assets/svg/star.svg" className="w-5" />
        </div>
        <div className="p-4 border-border hover:bg-card anim rounded-2xl cursor-pointer">
          <img src="/assets/svg/time.svg" className="w-5" />
        </div>
        <div className="p-4 border-border hover:bg-card anim rounded-2xl cursor-pointer mt-6">
          <img src="/assets/svg/fire.svg" className="w-5" />
        </div>
        <div className="p-4 border-border hover:bg-card anim rounded-2xl cursor-pointer">
          <img src="/assets/svg/spade.svg" className="w-5" />
        </div>
        <div className="p-4 border-border anim border rounded-2xl cursor-pointer">
          <img src="/assets/svg/rocket.svg" className="w-5" />
        </div> */}
      </div>
    </>
  );
};

export default Sidebar;
