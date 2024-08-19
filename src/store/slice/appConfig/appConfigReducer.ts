import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppConfigI } from "./types";

const initialState: AppConfigI = {
  darkMode: false,
};

export const appConfigSlice = createSlice({
  name: "appConfig",
  initialState: initialState,
  reducers: {
    setMode(state, action) {
      state.darkMode = action.payload;
      AsyncStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
  },
});

export const { setMode } = appConfigSlice.actions;
export default appConfigSlice.reducer;
