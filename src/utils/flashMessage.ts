import { showMessage as flashMessage } from "react-native-flash-message";

export const showFlashMessage = (type, message) => {
  flashMessage({
    type,
    message,
  });
};

// import { showMessage as flashMessage, FlashMessageProps, Message, MessageOptions } from "react-native-flash-message";

// type FlashMessageType = "success" | "info" | "warning" | "danger";
// interface FlashMessageI extends MessageOptions {
//   type: FlashMessageType;
//   message: string;
// }

// export const showFlashMessage = ({ type, message, ...rest }: FlashMessageI): void => {
//   const options: MessageOptions = {
//     type,
//     message,
//     ...rest,
//   };
//   flashMessage(options);
// };
