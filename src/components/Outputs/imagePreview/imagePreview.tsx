import React from "react";
import { View, Image, TouchableOpacity, StatusBar } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

import { Text } from "components/General/text/text";
import { colors } from "theme";
import { ModalHoc } from "components/HOCModal/ModalScreen/ModalScreen";
import { formatDate } from "utils/dateAndTime";
import { useAppTheme } from "hooks";
import { MessageItemI, RootState, useAppSelector } from "store";
import createStyles from "./styles";

interface ImagePreviewI {
  visible: boolean;
  item?: MessageItemI;
  onPressClose: () => void;
}

const ImagePreview: React.FC<ImagePreviewI> = ({ visible = false, item, onPressClose }) => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const senderName =
    user?._id === item?.sender._id ? "You" : `${item?.sender?.firstname || ""} ${item?.sender?.lastname || ""}`.trim();
  const creationDate = formatDate(item?.createdAt ?? new Date());
  const imageUri = item?.files?.[0] || null;

  return (
    <ModalHoc isVisible={visible} onPressClose={onPressClose}>
      <StatusBar backgroundColor={colors.black} barStyle={"light-content"} />

      <View style={styles.topHeaderContainer}>
        <TouchableOpacity onPress={onPressClose} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <View>
            <Text text={senderName} preset="semiBold" style={styles.userName} numberOfLines={1} />
            <Text text={creationDate} preset="default" style={styles.dateAndTime} />
          </View>
        </View>
      </View>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="contain" />}
    </ModalHoc>
  );
};

export { ImagePreview };
