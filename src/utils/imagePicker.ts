import { ImageSourcePropType } from "react-native";
import { launchCamera, launchImageLibrary, ImagePickerResponse } from "react-native-image-picker";

export const launchCameraHandler = (
  setProfileImage: (uri: ImageSourcePropType) => void,
  setSelectedImage: (any) => void,
  bottomSheetRef: any
) => {
  // bottomSheetRef.current.dismiss();

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
      setSelectedImage(response.assets[0]);
    }
  });
};

export const launchImageLibraryHandler = async (
  setProfileImage: (uri: ImageSourcePropType) => void,
  setSelectedImage: (any) => void,
  bottomSheetRef: any
) => {
  // bottomSheetRef.current.dismiss();

  let result = await launchImageLibrary({
    mediaType: "photo",
  });

  if (result?.assets) {
    const selectedImageUri = result.assets[0].uri;
    setProfileImage({ uri: selectedImageUri });
    setSelectedImage(result.assets[0]);
  }
};
