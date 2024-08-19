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

import DocumentPicker, { DocumentPickerResponse } from "react-native-document-picker";
import { launchImageLibrary, launchCamera, ImagePickerResponse } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Text } from "components/General/text/text";
import { useAppTheme } from "hooks";
import { LocationModal } from "../locationModal/locationModal";
import { uploadDocToCloudinary } from "utils/cloudinary";
import { getAttachmentPickerData } from "constant";
import createStyles from "./styles";

interface PropsI extends ModalProps {
  open: boolean;
  onClose: () => void;
  setPicture: (uri: any) => void;
}

const AttachmentPicker = ({ open, onClose, setPicture }: PropsI) => {
  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType | string>();
  const [selectedDocument, setSelectedDocument] = useState<DocumentPickerResponse>();
  const [selectedAudio, setSelectedAudio] = useState<DocumentPickerResponse>();
  const [isLocModalVisible, setLocModalVisible] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const onBackdropPress = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleOpenLocationModal = () => setLocModalVisible(true);

  const handleCloseModal = () => setLocModalVisible(false);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
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

  const launchDocumentPickerHandler = async () => {
    try {
      const result: DocumentPickerResponse[] = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      onClose();
      if (result.length > 0) {
        // console.log(result[0]);
        // setSelectedDocument(result[0]);
        await uploadDocToCloudinary(result[0]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled the document picker");
      } else {
        console.error("Unknown error: ", err);
      }
    }
  };

  const launchAudioPickerHandler = async () => {
    try {
      const result: DocumentPickerResponse[] = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      onClose();
      if (result.length > 0) {
        console.log("Audio === ", result[0]);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canceled the document picker");
      } else {
        console.error("Unknown error: ", err);
      }
    }
  };

  if (!open) return null;

  const attachmentPickerData = getAttachmentPickerData(
    launchCameraHandler,
    launchImageLibraryHandler,
    launchDocumentPickerHandler,
    launchAudioPickerHandler,
    handleOpenLocationModal
  );

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

      <LocationModal open={isLocModalVisible} onClose={handleCloseModal} onLocationSelect={handleLocationSelect} />
    </View>
  );
};

export { AttachmentPicker };
