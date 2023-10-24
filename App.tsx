import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { AppNavigator } from "./src/navigators";
import BootSplash from "react-native-bootsplash";

const App = () => {
  // Hiding splash screen
  useEffect(() => {
    setTimeout(() => {
      BootSplash.hide();
    }, 2000);
  }, []);

  return <AppNavigator />;
};

export default App;
