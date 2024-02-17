import React, { useRef, useState } from "react";
import { TouchableOpacity, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useOutsideClick } from "hooks/useOutsideClick";
import { Text } from "components/General/text/text";
import { hp, wp } from "utils/responsive";
import { colors } from "theme";

interface ScreensOption {
  id: number;
  title: string;
  screenName: string;
}

interface MenuI {
  isVisible: boolean;
  setMenuVisible: (value: boolean) => void;
}

export const Menu = ({ isVisible, setMenuVisible }: MenuI) => {
  const ref = useRef<View>(null);
  const [selectedScreenOpt, setSelectedScreenOpt] = useState<ScreensOption>({
    id: 0,
    title: "",
    screenName: "",
  });

  const screensOptions: ScreensOption[] = [
    { id: 1, title: "Send Request", screenName: "blockedusers" },
    { id: 2, title: "Recieve Request", screenName: "blockedusers" },
    { id: 3, title: "Blocked Users", screenName: "blockedusers" },
  ];

  const handleScreenOptChange = (item: ScreensOption) => {
    setSelectedScreenOpt(item);
    setMenuVisible(false);
    console.log(item.title);

    // navigation.navigate("blockedusers");
  };

  useOutsideClick(ref, () => {
    setMenuVisible(false);
  });

  return (
    <TouchableWithoutFeedback>
      <View ref={ref}>
        {isVisible && (
          <View style={[styles.optionsContainer]}>
            {screensOptions.map((item: ScreensOption, index: number) => (
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

const styles = StyleSheet.create({
  optionsContainer: {
    position: "absolute",
    top: hp(-84.5),
    right: wp(4),
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: hp(1),
    backgroundColor: "white",
    zIndex: 1,
    elevation: 1,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: hp(2.5),
    paddingVertical: hp(1.8),
  },
  optionWithBorder: {
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
});
