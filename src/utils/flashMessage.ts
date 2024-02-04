import { showMessage as flashMessage, FlashMessageProps } from "react-native-flash-message";

type FlashMessageType = "success" | "info" | "warning" | "danger";

type ShowFlashMessageProps = FlashMessageProps & {
  type: FlashMessageType;
  message: string;
};

export const showFlashMessage = ({ type, message, ...options }: ShowFlashMessageProps) => {
  flashMessage({
    type,
    message,
    ...options,
  });
};
