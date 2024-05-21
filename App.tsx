import "react-native-gesture-handler";
import BootSplash from "react-native-bootsplash";
import FlashMessage from "react-native-flash-message";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppNavigator } from "./src/navigators";
import { persistor, store } from "./src/store/store";
import { StatusBar } from "react-native";

const App = () => {
  // Hiding splash screen
  useEffect(() => {
    setTimeout(() => {
      BootSplash.hide();
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle={"dark-content"} />
        <AppNavigator />
        <FlashMessage position="bottom" style={{ marginTop: 20 }} />
      </PersistGate>
    </Provider>
  );
};

export default App;
