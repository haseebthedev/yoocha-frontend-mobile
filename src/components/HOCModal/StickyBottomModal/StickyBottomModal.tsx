import React, { ReactNode } from "react";
import { View, Modal, TouchableWithoutFeedback, ModalProps } from "react-native";
import styles from "./styles";

interface PropsI extends ModalProps {
  isVisible: boolean;
  children: ReactNode;
  onPressClose?: () => void;
  onBackdropPress: () => void;
}

const StickyBottomModalHoc = ({ isVisible = false, onPressClose, onBackdropPress, children, ...rest }: PropsI) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onPressClose} {...rest}>
      <TouchableWithoutFeedback onPress={onBackdropPress}>
        <View style={styles.backdrop}>
          <View style={styles.modalBg}>
            <View style={styles.dashContainer}>
              <View style={styles.dash}></View>
            </View>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export { StickyBottomModalHoc };
