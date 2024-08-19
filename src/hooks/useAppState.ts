import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

export const useAppState = () => {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return appState;
};
