import { GetAttachmentPickerData } from "interfaces";

export const getAttachmentPickerData: GetAttachmentPickerData = (
  launchCameraHandler,
  launchImageLibraryHandler,
  launchDocumentPickerHandler,
  launchAudioPickerHandler,
  handleOpenLocationModal
) => [
  {
    id: "0",
    title: "Document",
    icon: "document-text",
    bgStyle: "bgDocument",
    onPress: launchDocumentPickerHandler,
  },
  {
    id: "1",
    title: "Camera",
    icon: "camera",
    bgStyle: "bgCamera",
    onPress: launchCameraHandler,
  },
  {
    id: "2",
    title: "Gallery",
    icon: "images",
    bgStyle: "bgGallery",
    onPress: launchImageLibraryHandler,
  },
  {
    id: "3",
    title: "Audio",
    icon: "headset",
    bgStyle: "bgAudio",
    onPress: launchAudioPickerHandler,
  },
  {
    id: "4",
    title: "Location",
    icon: "location-sharp",
    bgStyle: "bgLocation",
    onPress: handleOpenLocationModal,
  },
];
