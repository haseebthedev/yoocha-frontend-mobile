import React from "react";
import { ImageSourcePropType, TouchableOpacity, View } from "react-native";

import { Asset } from "react-native-image-picker";
import BottomSheet, { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Text } from "components/General/text/text";
import { colors } from "theme";
import { BottomSheetModal } from "components/HOCModal/BottomSheet/BottomSheet";
import { launchCameraHandler, launchImageLibraryHandler } from "utils/imagePicker";
import createStyles from "./styles";
import { useAppTheme } from "hooks";
interface ImagePickerModalI {
  isVisible: boolean;
  title?: string;
  setProfileImage: (uri: ImageSourcePropType) => void;
  setAttachmentPickerVisible: (visible: boolean) => void;
  setSelectedImage: (image: Asset) => void;
  bottomSheetRef: React.RefObject<BottomSheet>;
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
  setAttachmentPickerVisible,
}: ImagePickerModalI) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

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
                launchCameraHandler(setProfileImage, setSelectedImage);
                if (bottomSheetRef.current) {
                  bottomSheetRef.current.close();
                }
                setAttachmentPickerVisible(false);
              }}
              style={styles.btnSection}
            >
              <Ionicons name="camera" size={35} color={colors.primary} />
              <Text text="Open Camera" preset="subheading" style={styles.btnTitle} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                launchImageLibraryHandler(setProfileImage, setSelectedImage);
                if (bottomSheetRef.current) {
                  bottomSheetRef.current.close();
                }
                setAttachmentPickerVisible(false);
              }}
              style={styles.btnSection}
            >
              <Ionicons name="image" size={35} color={colors.primary} />
              <Text text="Open Gallery" preset="subheading" style={styles.btnTitle} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    </BottomSheetModal>
  );
};

export { ImagePickerModal };
