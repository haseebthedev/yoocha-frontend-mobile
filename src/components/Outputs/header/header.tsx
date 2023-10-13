import React from "react";
import { View, TouchableOpacity } from "react-native";
import { HeaderProps } from "./header.props";
import { Text } from "../../General/text/text";
import { hp } from "../../../utils/responsive";
import { colors } from "theme";
import { navigationRef } from "navigators";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

export function Header(props: HeaderProps) {
  const {
    headerText,
    // headerTx,
    rightIcon,
    onRightPress,
    leftIcon,
    onLeftPress,
    style,
    titleStyle = {},
    customComponentRight,
  } = props;

  const backPress = () => {
    let canGoBack = navigationRef.canGoBack();
    if (canGoBack) {
      navigationRef.goBack();
    }
  };

  const ICON_SIZE = hp(3);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftBlock}>
        {leftIcon && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={onLeftPress ? () => onLeftPress() : () => backPress()}
          >
            <Ionicons name={leftIcon || "chevron-back"} size={ICON_SIZE} color={colors.black} />
          </TouchableOpacity>
        )}
      </View>

      <Text text={headerText} style={titleStyle} preset="heading" />

      {rightIcon ? (
        <TouchableOpacity style={styles.iconContainer} onPress={onRightPress}>
          <Ionicons name={rightIcon || "ellipsis-vertical"} size={ICON_SIZE} color={colors.primary} />
        </TouchableOpacity>
      ) : (
        <View style={{ flexDirection: "row" }}>{customComponentRight}</View>
      )}
    </View>
  );
}
