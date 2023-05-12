import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUp: false,
  login: false,
  walletConnect: false,
  menu: false,
  chain: "ebone",
};

export const slice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setSignUp: (state, action) => {
      state.signUp = action.payload;
    },
    setWalletConnect: (state, action) => {
      state.walletConnect = action.payload;
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setChain: (state, action) => {
      state.chain = action.payload;
    },
  },
});

export const { setSignUp, setWalletConnect, setMenu, setLogin, setChain } =
  slice.actions;

export default slice.reducer;
