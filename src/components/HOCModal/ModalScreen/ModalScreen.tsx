import React, { ReactNode } from "react";
import { View, Modal } from "react-native";
import styles from "./styles";

interface Props {
  children: ReactNode;
  isVisible: boolean;
  title?: string;
  onPressClose: (value: boolean) => void;
}

export const ModalHoc = ({ children, isVisible = false, title, onPressClose }: Props) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={() => onPressClose(false)}>
      <View style={styles.modalView}>{children}</View>
    </Modal>
  );
};
