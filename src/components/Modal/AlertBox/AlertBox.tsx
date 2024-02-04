import React from "react";
import { Modal, View, Pressable, GestureResponderEvent, ModalProps } from "react-native";
import { Text } from "components/General/text/text";
import { hp, wp } from "utils/responsive";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppButton } from "components/Buttons/AppButton/AppButton";
import styles from "./styles";

interface PropsI extends ModalProps {
  open: boolean;
  onClose: () => void;
  autoClose?: boolean;
  type?: "error" | "success";
  title?: string;
  description: string;
  secondaryButtonText?: string;
  primaryButtonText?: string;
  secondaryOnClick?: () => void;
  primaryOnClick?: () => void;
  checkIcon?: boolean;
  buttonColor?: string;
}

const AlertBox = ({
  open,
  onClose,
  type = "success",
  title,
  description,
  secondaryButtonText,
  primaryButtonText,
  secondaryOnClick,
  primaryOnClick,
  checkIcon,
  buttonColor,
}: PropsI) => {
  if (!open) return null;

  const onBackdropPress = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={open}>
        <Pressable style={styles.centeredView} onPress={onBackdropPress}>
          <View style={styles.modalView}>
            {checkIcon && (
              <View style={[styles.typeBlock, type === "error" ? styles.typeErrorBlock : styles.typeSuccessBlock]}>
                <Ionicons name="checkmark-outline" size={22} color="white" />
              </View>
            )}

            {title && <Text text={title} style={styles.title} preset="largeHeading" />}
            <Text text={description} style={styles.text} />

            <View style={{ flexDirection: "row", marginTop: hp(2), gap: wp(4), marginBottom: hp(2) }}>
              {secondaryButtonText && (
                <View style={{ flex: 1 }}>
                  <AppButton text={secondaryButtonText} onPress={secondaryOnClick} />
                </View>
              )}
              {primaryButtonText && (
                <View style={{ flex: 1 }}>
                  <AppButton preset="filled" text={primaryButtonText} onPress={primaryOnClick} />
                </View>
              )}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export { AlertBox };
