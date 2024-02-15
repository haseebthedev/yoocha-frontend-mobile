import React, { useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "components/General/text/text";
import { colors } from "theme";
import { height } from "utils/responsive";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheet, BottomSheetRefProps } from "components/HOCModal/BottomSheet/BottomSheet";
import { launchImageLibrary, launchCamera, ImagePickerResponse } from "react-native-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

interface ImagePickerModalI {
  isVisible: boolean;
  title?: string;
  setProfileImage: (any) => void;
  onModalClose?: () => void;
  onBackdropPress: () => void;
}

const ImagePickerModal: React.FC<ImagePickerModalI> = ({
  isVisible = false,
  title,
  setProfileImage,
  onModalClose,
  onBackdropPress,
}: ImagePickerModalI) => {
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

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
    }
  };

  return (
    <>
      {isVisible && (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheet
            ref={bottomSheetRef}
            height={height - 110}
            closeBottomSheet={onBackdropPress}
            onClose={onModalClose}
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
          </BottomSheet>
        </GestureHandlerRootView>
      )}
    </>
  );
};

export { ImagePickerModal };
