import React from "react";
import { Modal, View, Pressable, GestureResponderEvent, ModalProps } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

import { colors } from "theme";
import { useAppTheme } from "hooks";
import { LoadingIndicator, Text, AppButton } from "components";
import createStyles from "./styles";

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
  loading?: boolean;
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
  loading = false,
}: PropsI) => {
  if (!open) return null;

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

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

            <View style={styles.btnContainer}>
              {secondaryButtonText && (
                <View style={styles.btn}>
                  <AppButton
                    text={secondaryButtonText}
                    onPress={secondaryOnClick}
                    textStyle={type === "error" && { color: colors.red }}
                    style={[type === "error" && { borderColor: colors.red }, { backgroundColor: "transparent" }]}
                  />
                </View>
              )}
              {primaryButtonText && (
                <View style={styles.btn}>
                  <AppButton
                    preset="filled"
                    text={loading ? "" : primaryButtonText}
                    onPress={primaryOnClick}
                    disabled={loading}
                    style={type === "error" && { backgroundColor: colors.red }}
                    RightAccessory={() => loading && <LoadingIndicator color={colors.white} />}
                  />
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
