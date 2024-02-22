import React from "react";
import { ImageSourcePropType, TouchableOpacity, View } from "react-native";
import { Text } from "components/General/text/text";
import { colors } from "theme";
import { BottomSheetModal } from "components/HOCModal/BottomSheet/BottomSheet";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { launchImageLibrary, launchCamera, ImagePickerResponse } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

interface ImagePickerModalI {
  isVisible: boolean;
  title?: string;
  setProfileImage: (uri: ImageSourcePropType) => void;
  bottomSheetRef: any;
  snapPoints: string[];
  renderBackdrop: React.FC<BottomSheetBackdropProps>;
}

const ImagePickerModal: React.FC<ImagePickerModalI> = ({
  isVisible,
  title,
  setProfileImage,
  bottomSheetRef,
  snapPoints,
  renderBackdrop,
}: ImagePickerModalI) => {
  const launchCameraHandler = () => {
    let options: any = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };
    launchCamera(options, (response: ImagePickerResponse) => {
      if (response?.assets) {
        const selectedImageUri = response.assets[0].uri;
        setProfileImage({ uri: selectedImageUri });
        bottomSheetRef.current.close();
      }
    });
  };

  const launchImageLibraryHandler = async () => {
    let result = await launchImageLibrary({
      mediaType: "photo",
    });

    if (result?.assets) {
      const selectedImageUri = result.assets[0].uri;
      setProfileImage({ uri: selectedImageUri });
      bottomSheetRef.current.close();
    }
  };

  return (
    <BottomSheetModal
      isVisible={isVisible}
      snapPoints={snapPoints}
      renderBackdrop={renderBackdrop}
      bottomSheetRef={bottomSheetRef}
    >
      <>
        <Text text={title} preset="heading" style={styles.heading} />

        <View style={styles.body}>
          <View style={styles.btnParentSection}>
            <TouchableOpacity onPress={launchCameraHandler} style={styles.btnSection}>
              <Ionicons name="camera" size={35} color={colors.primary} />
              <Text text="Open Camera" preset="subheading" />
            </TouchableOpacity>

            <TouchableOpacity onPress={launchImageLibraryHandler} style={styles.btnSection}>
              <Ionicons name="image" size={35} color={colors.primary} />
              <Text text="Open Gallery" preset="subheading" />
            </TouchableOpacity>
          </View>
        </View>
      </>
    </BottomSheetModal>
  );
};

export { ImagePickerModal };
