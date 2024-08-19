import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";
import authReducer from "./slice/auth/authReducer";
import chatReducer from "./slice/chat/chatReducer";
import contactReducer from "./slice/contact/contactReducer";
import appConfigReducer from "./slice/appConfig/appConfigReducer";
import notificationReducer from "./slice/notification/notificationReducer";
import tokenReducer from "./slice/fcmTtoken/fcmTokenReducer";

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["contacts"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  contacts: contactReducer,
  appConfig: appConfigReducer,
  notification: notificationReducer,
  token: tokenReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
