import { ButtonProps, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { Text } from "components";
import styles from "./styles";

const BUTTON_PRESETS = {
  filled: {
    container: styles.btnContainerFilled,
    text: [styles.btnText, styles.btnTextFilled],
  },
  outlined: {
    container: styles.btnContainerOutlined,
    text: [styles.btnText, styles.btnTextOutlined],
  },
  default: {
    container: styles.btnContainer,
    text: [styles.btnText, styles.btnText],
  },
};

interface ButtonI extends ButtonProps {
  title: string;
  onPress?: () => void;
  preset?: "filled" | "outlined" | "default";
  buttonColor?: string;
}

const Button = ({ title, onPress, preset = "default", buttonColor, ...rest }: ButtonI) => {
  const { container, text } = BUTTON_PRESETS[preset] || {};
  const containerStyle: StyleProp<ViewStyle> = [
    styles.btnContainer,
    container,
    preset === "filled" && buttonColor ? { backgroundColor: buttonColor } : {},
    preset === "outlined" && buttonColor ? { borderColor: buttonColor } : {},
  ];

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress} {...rest}>
      <Text
        style={[styles.btnText, ...text, preset === "outlined" && buttonColor ? { color: buttonColor } : {}]}
        preset="heading"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export { Button };
