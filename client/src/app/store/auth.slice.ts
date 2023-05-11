import { createSlice } from "@reduxjs/toolkit";
import { socketEvents } from "../providers/socket";

const initialState = {
  address: "",
  token: "",
  balance: 0,
  name: "",
  avatarUrl: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: any) => {
      state.address = action.payload.address;
      state.token = action.payload.token;
      state.balance = action.payload.balance;
      state.name = action.payload.name;
      state.avatarUrl = action.payload.avatarUrl;
      socketEvents.emitAuth({ auth: state });
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
