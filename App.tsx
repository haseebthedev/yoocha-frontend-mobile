import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppNavigator } from "./src/navigators";
import { persistor, store } from "./src/store/store";
import { initSocketIO, disconnectSocketIO } from "./src/socket/socketIo";
import BootSplash from "react-native-bootsplash";
import FlashMessage from "react-native-flash-message";

const App = () => {
  // Hiding splash screen
  useEffect(() => {
    setTimeout(() => {
      BootSplash.hide();
    }, 2000);
  }, []);

  useEffect(() => {
    initSocketIO();

    return () => {
      disconnectSocketIO();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
        <FlashMessage position="bottom" style={{ marginTop: 20 }} />
      </PersistGate>
    </Provider>
  );
};

export default App;
