import { useNavigationState } from "@react-navigation/native";

export const useCurrentRouteName = () => {
  const state = useNavigationState((state) => state);

  return state.routes[state.index]?.name;
};
