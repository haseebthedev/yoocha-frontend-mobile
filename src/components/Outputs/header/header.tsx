import React from "react";
import { View, TouchableOpacity } from "react-native";
import { HeaderProps } from "./header.props";
import { Text } from "../../General/text/text";
import { colors } from "theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { RootState, useAppSelector } from "store";
import { useAppTheme } from "hooks";

export function Header({
  headerText,
  rightIcon,
  onRightPress,
  leftIcon,
  onLeftPress,
  style,
  iconStyle,
  titleStyle = {},
  isSticky = false,
  customComponentRight,
}: HeaderProps) {
  const { theme } = useAppTheme();

  const ICON_SIZE = 24;

  const renderLeftIcon = () => {
    return (
      <TouchableOpacity onPress={onLeftPress}>
        <Ionicons
          name={leftIcon || "chevron-back"}
          size={ICON_SIZE}
          color={leftIcon ? (iconStyle ? iconStyle : theme.colors.iconColor) : colors.transparent}
        />
      </TouchableOpacity>
    );
  };

  const renderRightIcon = () => {
    if (customComponentRight) {
      return <View style={{ flexDirection: "row" }}>{customComponentRight}</View>;
    } else {
      return (
        <TouchableOpacity onPress={onRightPress}>
          <Ionicons
            name={rightIcon || "ellipsis-vertical"}
            size={ICON_SIZE}
            color={rightIcon ? (iconStyle ? iconStyle : theme.colors.iconColor) : colors.transparent}
          />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={[styles.container, style, isSticky && { position: "absolute", top: 0, width: "100%" }]}>
      <View style={[styles.iconContainer, { alignItems: "flex-start" }]}>{renderLeftIcon()}</View>

      <Text text={headerText} style={titleStyle} preset="logo" />

      <View style={[styles.iconContainer, { alignItems: "flex-end" }]}>{renderRightIcon()}</View>
    </View>
  );
}
