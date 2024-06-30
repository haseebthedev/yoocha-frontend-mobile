import React, { useState } from "react";
import {
  TouchableOpacity,
  Modal,
  Pressable,
  GestureResponderEvent,
  ModalProps,
  View,
  ImageSourcePropType,
} from "react-native";

import { launchImageLibrary, launchCamera, ImagePickerResponse } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Text } from "components/General/text/text";
import { useAppTheme } from "hooks";
import { getAttachmentPickerData } from "constant";
import createStyles from "./styles";

interface PropsI extends ModalProps {
  open: boolean;
  onClose: () => void;
  setPicture: (uri: any) => void;
}

const AttachmentPicker = ({ open, onClose, setPicture }: PropsI) => {
  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType | string>();
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const onBackdropPress = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const launchCameraHandler = () => {
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchCamera(options, (response: ImagePickerResponse) => {
      onClose();
      if (response?.assets) {
        setSelectedImage(response.assets[0]);
        setPicture(response.assets[0].uri);
      }
    });
  };

  const launchImageLibraryHandler = async () => {
    onClose();
    let result = await launchImageLibrary({
      mediaType: "photo",
    });

    if (result?.assets) {
      setSelectedImage(result.assets[0]);
      setPicture(result.assets[0].uri);
    }
  };

  if (!open) return null;

  const attachmentPickerData = getAttachmentPickerData(launchCameraHandler, launchImageLibraryHandler);

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={open}>
        <Pressable style={styles.centeredView} onPress={onBackdropPress}>
          <View style={styles.modalView}>
            <View style={styles.innerContainer}>
              {attachmentPickerData.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.fileTypeContainer}
                  onPress={item.onPress}
                  activeOpacity={0.5}
                >
                  <View style={[styles.iconContainer, styles[item.bgStyle]]}>
                    <Ionicons name={item.icon} size={25} color="white" />
                  </View>
                  <Text text={item.title} preset="inputText" style={styles.title} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export { AttachmentPicker };
