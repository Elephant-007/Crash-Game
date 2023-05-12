import { createSlice } from "@reduxjs/toolkit";
import { socketEvents } from "../providers/socket";

const initialState = {
  token: "",
  user: {
    address: "",
    name: "",
    avatar: "",
    balance: {
      btc: 0,
      eth: 0,
      ltc: 0,
      egld: 0,
      kas: 0,
      erg: 0,
      xrp: 0,
      bnb: 0,
      usdc: 0,
      usdt: 0,
      matic: 0,
      ada: 0,
      sol: 0,
      ebone: 0,
    },
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogout: (state) => {
      state.token = initialState.token;
      state.user = initialState.user;
    },
    setAuth: (state, action: any) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      socketEvents.emitAuth({ auth: state });
    },
  },
});

export const { setAuth, setLogout } = authSlice.actions;

export default authSlice.reducer;
