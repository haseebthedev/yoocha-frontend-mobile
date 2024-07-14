import { Modal, ModalProps, TouchableOpacity, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { Text } from "components/General/text/text";
import { colors } from "theme";
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
    <Modal animationType="slide" transparent={false} visible={open} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <Text text={"Select Location"} preset="labelHeading" />
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={25} color={theme.colors.iconColor} />
          </TouchableOpacity>
        </View>

        <View style={styles.map}></View>

        <View style={styles.mapOptionsContainer}>
          <TouchableOpacity style={styles.mapOptions} activeOpacity={0.7}>
            <MaterialIcons name="zoom-out-map" size={25} color={colors.textDark} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapOptions} activeOpacity={0.7}>
            <FontAwesome6 name="location-crosshairs" size={25} color={colors.textDark} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.liveLocation} activeOpacity={0.6}>
          <View style={styles.liveLocationIcon}>
            <Ionicons name="location" size={25} color={"white"} />
          </View>
          <Text text={"Share live location"} preset="heading" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export { LocationModal };
