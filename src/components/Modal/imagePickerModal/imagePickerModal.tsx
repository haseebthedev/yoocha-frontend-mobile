import React from "react";
import { ImageSourcePropType, TouchableOpacity, View } from "react-native";

import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Text } from "components/General/text/text";
import { colors } from "theme";
import { BottomSheetModal } from "components/HOCModal/BottomSheet/BottomSheet";
import { launchCameraHandler, launchImageLibraryHandler } from "utils/imagePicker";
import styles from "./styles";

interface ImagePickerModalI {
  isVisible: boolean;
  title?: string;
  setProfileImage: (uri: ImageSourcePropType) => void;
  setSelectedImage: (any) => void;
  bottomSheetRef: any;
  snapPoints: string[];
  renderBackdrop: React.FC<BottomSheetBackdropProps>;
}

const ImagePickerModal: React.FC<ImagePickerModalI> = ({
  isVisible,
  title,
  setProfileImage,
  setSelectedImage,
  bottomSheetRef,
  snapPoints,
  renderBackdrop,
}: ImagePickerModalI) => {
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
            <TouchableOpacity
              onPress={() => {
                bottomSheetRef.current.close();
                launchCameraHandler(setProfileImage, setSelectedImage, bottomSheetRef);
              }}
              style={styles.btnSection}
            >
              <Ionicons name="camera" size={35} color={colors.primary} />
              <Text text="Open Camera" preset="subheading" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                bottomSheetRef.current.close();
                launchImageLibraryHandler(setProfileImage, setSelectedImage, bottomSheetRef);
              }}
              style={styles.btnSection}
            >
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
