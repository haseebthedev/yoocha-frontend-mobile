import React from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

interface ActionButtonProps {
  icon: string;
  onPress: (event: GestureResponderEvent) => void;
  color: string;
  size: number;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ icon, onPress, color, size, disabled = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.actionButton, disabled && styles.disabledButton]}
      disabled={disabled}
    >
      <Ionicons name={icon} color={color} size={size} />
    </TouchableOpacity>
  );
};
