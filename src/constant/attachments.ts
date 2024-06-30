import { GetAttachmentPickerData } from "interfaces";

export const getAttachmentPickerData: GetAttachmentPickerData = (launchCameraHandler, launchImageLibraryHandler) => [
  {
    id: "0",
    title: "Document",
    icon: "document-text",
    bgStyle: "bgDocument",
    onPress: () => console.log("Document Pressed"),
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
    onPress: () => console.log("Audio Pressed"),
  },
  {
    id: "4",
    title: "Location",
    icon: "location-sharp",
    bgStyle: "bgLocation",
    onPress: () => console.log("Location Pressed"),
  },
];
