import React from "react";
import { Image, StatusBar, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Text } from "components/General/text/text";
import { colors } from "theme";
import { formatDate } from "utils/dateAndTime";
import { ModalHoc } from "components/HOCModal/ModalScreen/ModalScreen";
import personPlaceholder from "assets/images/personplaceholder.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

interface Props {
  isVisible: boolean;
  title?: string;
  selectedItem?: any;
  onPressClose: () => void;
}

export const StatusModal = ({ isVisible = false, title, onPressClose, selectedItem }: Props) => {
  return (
    <ModalHoc title={title} isVisible={isVisible} onPressClose={onPressClose}>
      <StatusBar backgroundColor={colors.black} barStyle={"light-content"} />
      <View style={styles.statusHeader}>
        <View style={styles.statusBarLine}>
          <View style={styles.statusBar}></View>
        </View>
        <View style={styles.topHeaderContainer}>
          <View style={styles.userInfo}>
            <Image
              source={selectedItem.profilePic != "" ? { uri: selectedItem.profilePic } : personPlaceholder}
              style={styles.profileImage}
            />
            <View>
              <Text text={selectedItem.name} preset="semiBold" style={styles.name} numberOfLines={1} />
              <Text text={formatDate(selectedItem.date)} preset="subheading" style={styles.dateAndTime} />
            </View>
          </View>
          <TouchableOpacity onPress={onPressClose} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={
          selectedItem.statusImage != ""
            ? {
                uri: selectedItem.statusImage,
              }
            : personPlaceholder
        }
        style={styles.statusPic}
      />
    </ModalHoc>
  );
};
