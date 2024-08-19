export interface AttachmentPickerItem {
  id: string;
  title: string;
  icon: string;
  bgStyle: string;
  onPress: () => void;
}

export type GetAttachmentPickerData = (
  launchCameraHandler: () => void,
  launchImageLibraryHandler: () => void,
  launchDocumentPickerHandler: () => void,
  launchAudioPickerHandler: () => void,
  handleOpenLocationModal: () => void
) => AttachmentPickerItem[];
