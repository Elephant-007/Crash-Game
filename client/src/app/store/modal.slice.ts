import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUp: false,
  walletConnect: false,
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
  },
});

export const { setSignUp, setWalletConnect } = slice.actions;

export default slice.reducer;
