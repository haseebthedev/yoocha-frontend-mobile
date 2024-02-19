import React, { useRef, useState } from "react";
import { TouchableOpacity, View, TouchableWithoutFeedback } from "react-native";
import { Text } from "components/General/text/text";
import { navigate } from "navigators";
import { useOutsideClick } from "hooks/useOutsideClick";
import { MenuI, MenuOptionsI } from "interfaces";
import styles from "./styles";

export const Menu = ({ isVisible, setMenuVisible, menuOptions }: MenuI) => {
  const ref = useRef<View>(null);
  const [selectedScreenOpt, setSelectedScreenOpt] = useState<MenuOptionsI>({
    id: 0,
    title: "",
    screenName: "",
  });

  const handleScreenOptChange = (item: MenuOptionsI) => {
    setSelectedScreenOpt(item);
    setMenuVisible(false);
    console.log(item.title);
    navigate(item.screenName);
  };

  // useOutsideClick(ref, () => {
  //   setMenuVisible(false);
  // });

  return (
    <TouchableWithoutFeedback>
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
    </TouchableWithoutFeedback>
  );
};
