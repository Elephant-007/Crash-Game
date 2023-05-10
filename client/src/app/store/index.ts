import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import crashReducer from "./crash.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    crash: crashReducer,
  },
});
