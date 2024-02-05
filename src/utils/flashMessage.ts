import { showMessage as flashMessage, MessageOptions, MessageType } from "react-native-flash-message";

type ShowFlashMessageProps = MessageOptions & {
  type: MessageType;
  message: string;
};

export const showFlashMessage = ({ type, message, ...options }: ShowFlashMessageProps) => {
  flashMessage({
    type,
    message,
    ...options,
  });
};
