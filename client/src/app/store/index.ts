import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import crashReducer from "./crash.slice";
import modalReducer from "./modal.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    crash: crashReducer,
    modal: modalReducer,
  },
});
