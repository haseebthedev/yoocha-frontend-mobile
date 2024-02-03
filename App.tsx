import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { AppNavigator } from "./src/navigators";
import { Provider } from "react-redux";
import BootSplash from "react-native-bootsplash";
import { persistor, store } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import FlashMessage from "react-native-flash-message";

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
        <AppNavigator />
        <FlashMessage position="bottom" style={{ marginTop: 20 }} />
      </PersistGate>
    </Provider>
  );
};

export default App;
