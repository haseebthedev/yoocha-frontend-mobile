import { showMessage as flashMessage } from "react-native-flash-message";

export const showFlashMessage = (type, message) => {
  flashMessage({
    type,
    message,
  });
};
