import { useEffect } from "react";
import { TouchableWithoutFeedback, GestureResponderEvent } from "react-native";

type OutsideClickHandler = (event: GestureResponderEvent) => void;

const useOutsideClick = (ref, handler: OutsideClickHandler) => {
  useEffect(() => {
    const listener = (event: GestureResponderEvent) => {
      if (!ref.current || !ref.current.contains(event.target)) {
        handler(event);
      }
    };

    const handlerWrapper = (event: GestureResponderEvent) => {
      const touches = event.nativeEvent.touches;
      if (touches.length === 1) {
        listener(event);
      }
    };

    const subscription = TouchableWithoutFeedback.addEventListener("press", handlerWrapper);

    return () => {
      subscription.remove();
    };
  }, [handler]);

  return ref;
};

export { useOutsideClick };
