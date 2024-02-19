import React, { useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "components/General/text/text";
import { navigate } from "navigators";
import { useOutsideClick } from "hooks/useOutsideClick";
import { MenuI, MenuOptionsI } from "interfaces";
import styles from "./styles";

export const Menu = ({ isVisible, setMenuVisible, menuOptions }: MenuI) => {
  const ref = useRef<View>(null);

  const handleScreenOptChange = (item: MenuOptionsI) => {
    setMenuVisible(false);
    if (item.screenName) {
      navigate(item.screenName);
    }
  };

  // useOutsideClick(ref, () => {
  //   setMenuVisible(false);
  // });

  return (
    <View ref={ref}>
      {isVisible && (
        <View style={[styles.optionsContainer]}>
          {menuOptions.map((item: MenuOptionsI, index: number) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleScreenOptChange(item)}
              style={[styles.option, index !== menuOptions.length - 1 && styles.optionWithBorder]}
            >
              <Text preset="light" text={item.title} numberOfLines={1} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
