import React, { useRef, useState } from "react";
import { TouchableOpacity, View, TouchableWithoutFeedback } from "react-native";
import { Text } from "components/General/text/text";
import { useOutsideClick } from "hooks/useOutsideClick";
import { MenuI, ScreensOptionI } from "interfaces";
import styles from "./styles";

const screensOptions: ScreensOptionI[] = [
  { id: 1, title: "Send Request", screenName: "blockedusers" },
  { id: 2, title: "Recieve Request", screenName: "blockedusers" },
  { id: 3, title: "Blocked Users", screenName: "blockedusers" },
];

export const Menu = ({ isVisible, setMenuVisible }: MenuI) => {
  const ref = useRef<View>(null);
  const [selectedScreenOpt, setSelectedScreenOpt] = useState<ScreensOptionI>({
    id: 0,
    title: "",
    screenName: "",
  });

  const handleScreenOptChange = (item: ScreensOptionI) => {
    setSelectedScreenOpt(item);
    setMenuVisible(false);
    console.log(item.title);
  };

  useOutsideClick(ref, () => {
    setMenuVisible(false);
  });

  return (
    <TouchableWithoutFeedback>
      <View ref={ref}>
        {isVisible && (
          <View style={[styles.optionsContainer]}>
            {screensOptions.map((item: ScreensOptionI, index: number) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleScreenOptChange(item)}
                style={[styles.option, index !== screensOptions.length - 1 && styles.optionWithBorder]}
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
