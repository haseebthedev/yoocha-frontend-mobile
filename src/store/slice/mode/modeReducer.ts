import { createSlice } from "@reduxjs/toolkit";
import { ModeI } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState: ModeI = {
  darkMode: false,
};

export const modeSlice = createSlice({
  name: "mode",
  initialState: initialState,
  reducers: {
    setMode(state, value) {
      state.darkMode = value.payload;
      AsyncStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
  },
});

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;
