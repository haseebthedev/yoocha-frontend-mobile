import { Modal, ModalProps, Pressable } from "react-native";

import { useAppTheme } from "hooks";
import createStyles from "./styles";

interface PropsI extends ModalProps {
  open: boolean;
  onClose: () => void;
  onLocationSelect: (location: any) => void;
}

const LocationModal = ({ open, onClose, onLocationSelect }: PropsI) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <Modal transparent={true} visible={open}>
      <Pressable onPress={onClose}></Pressable>
    </Modal>
  );
};

export { LocationModal };
