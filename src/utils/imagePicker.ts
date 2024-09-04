import { ImageSourcePropType } from "react-native";
import { launchCamera, launchImageLibrary, ImagePickerResponse, Asset } from "react-native-image-picker";

export const launchCameraHandler = (
  setProfileImage: (uri: ImageSourcePropType) => void,
  setSelectedImage: (image: Asset) => void
) => {
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
      console.log(response.assets[0]);
      setSelectedImage(response.assets[0]);
    }
  });
};

export const launchImageLibraryHandler = async (
  setProfileImage: (uri: ImageSourcePropType) => void,
  setSelectedImage: (image: Asset) => void
) => {
  let result = await launchImageLibrary({
    mediaType: "photo",
  });

  if (result?.assets) {
    const selectedImageUri = result.assets[0].uri;
    setProfileImage({ uri: selectedImageUri });

    setSelectedImage(result.assets[0]);
  }
};
