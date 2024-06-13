import React, { useRef } from "react";
import { Modal, TouchableOpacity, View, SafeAreaView, Animated, Easing } from "react-native";
import { Text } from "components/General/text/text";
import { MenuI, MenuOptionI } from "interfaces";
import createStyles from "./styles";
import { useAppTheme } from "hooks";

export const PopupMenu = ({ isVisible, menuOptions, setMenuVisible, setMenuOption }: MenuI) => {
  const { theme } = useAppTheme();

  const styles = createStyles(theme);

  const scale = useRef(new Animated.Value(0)).current;

  const resize = (to: number) => {
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && setMenuVisible(false));
  };

  const onPressMenuOption = (item: MenuOptionI) => {
    item.onPress && item.onPress();
    setMenuOption?.(item);

    resize(0);
  };

  return (
    <>
      <Modal transparent visible={isVisible}>
        <SafeAreaView style={styles.safeAreaStyle} onTouchStart={() => resize(0)}>
          <View style={styles.optionsContainer}>
            {menuOptions.map((item: MenuOptionI, index: number) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.option, index !== menuOptions.length - 1 && styles.optionWithBorder]}
                onPress={() => onPressMenuOption(item)}
              >
                <Text preset="light" text={item.title} numberOfLines={1} style={styles.optionText} />
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};
