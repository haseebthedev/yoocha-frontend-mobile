import { useTheme } from "@react-navigation/native";
import { setMode } from "store/slice/appConfig/appConfigReducer";
import { darkTheme, lightTheme } from "theme";
import { RootState, useAppDispatch, useAppSelector } from "store";

export const useAppTheme = () => {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state: RootState) => state.appConfig);
  const navigationTheme = useTheme();
  const theme = darkMode ? darkTheme : lightTheme;

  const toggleMode = async () => {
    await dispatch(setMode(!darkMode));
  };

  return { theme, toggleMode, darkMode, navigationTheme };
};
