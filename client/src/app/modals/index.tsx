import React from "react";
import ModalSignUp from "./ModalSignUp";
import ModalWalletConnect from "./ModalWalletConnect";
import ModalScreenshot from "./ModalScreenshot";

const Modals = () => {
  return (
    <>
      <ModalSignUp></ModalSignUp>
      <ModalWalletConnect></ModalWalletConnect>
      <ModalScreenshot></ModalScreenshot>
    </>
  );
};

export default Modals;
