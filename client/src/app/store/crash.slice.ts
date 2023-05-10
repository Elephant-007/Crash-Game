import { createSlice } from "@reduxjs/toolkit";
import { constStates } from "../config/const";

const initialState = {
  gameState: {
    time: 0,
    state: constStates.loading,
    point: 0,
  },
  playerState: [],
  waitingState: [],
};

export const crashSlicer = createSlice({
  name: "crash",
  initialState,
  reducers: {
    setGameState: (state, action) => {
      state.gameState = action.payload.gameState;
      state.playerState = action.payload.playerState;
      state.waitingState = action.payload.waitingState;
    },
  },
});

export const { setGameState } = crashSlicer.actions;

export default crashSlicer.reducer;
