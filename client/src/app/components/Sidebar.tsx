import React from "react";

const Sidebar = () => {
  return (
    <div className="px-4 py-8 border-r border-border h-[100vh] flex flex-col items-center gap-4 flex-none fixed">
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
  );
};

export default Sidebar;
