import React, { useState } from "react";
import { TouchableOpacity, Modal, Pressable, GestureResponderEvent, ModalProps, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { launchImageLibrary, launchCamera, ImagePickerResponse } from "react-native-image-picker";

import { Text } from "components/General/text/text";
import { useAppTheme } from "hooks";
import createStyles from "./styles";
import { ImageSourcePropType } from "react-native";

interface PropsI extends ModalProps {
  open: boolean;
  onClose: () => void;
  setPicture: (uri: any) => void;
}

const FilePicker = ({ open, onClose, setPicture }: PropsI) => {
  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType | string>();

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const onBackdropPress = (event: GestureResponderEvent) => {
    console.log("close");
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

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={open}>
        <Pressable style={styles.centeredView} onPress={onBackdropPress}>
          <View style={styles.modalView}>
            <View style={styles.innerContainer}>
              <TouchableOpacity style={styles.fileTypeContainer} activeOpacity={0.5}>
                <View style={[styles.iconContainer, styles.bgDocument]}>
                  <Ionicons name="document-text" size={25} color="white" />
                </View>
                <Text text={"Documents"} preset="inputText" style={styles.title} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.fileTypeContainer} onPress={launchCameraHandler}>
                <View style={[styles.iconContainer, styles.bgCamera]}>
                  <Ionicons name="camera" size={25} color="white" />
                </View>
                <Text text={"Camera"} preset="inputText" style={styles.title} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.fileTypeContainer} onPress={launchImageLibraryHandler}>
                <View style={[styles.iconContainer, styles.bgGallery]}>
                  <Ionicons name="images" size={25} color="white" />
                </View>
                <Text text={"Gallery"} preset="inputText" style={styles.title} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.fileTypeContainer}>
                <View style={[styles.iconContainer, styles.bgAudio]}>
                  <Ionicons name="headset" size={25} color="white" />
                </View>
                <Text text={"Audio"} preset="inputText" style={styles.title} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.fileTypeContainer}>
                <View style={[styles.iconContainer, styles.bgLocation]}>
                  <Ionicons name="location-sharp" size={25} color="white" />
                </View>
                <Text text={"Location"} preset="inputText" style={styles.title} />
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export { FilePicker };
