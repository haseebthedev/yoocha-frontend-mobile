// Heading.tsx

import React, { ReactNode } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "components";
import styles from "./styles";

interface AppHeadingI {
  title: string;
  rightTitle?: ReactNode;
  onRightPress?: () => void;
}

const AppHeading: React.FC<AppHeadingI> = ({ title, rightTitle, onRightPress }) => {
  return (
    <View style={styles.container}>
      <Text text={title} preset="heading" />
      {rightTitle && (
        <TouchableOpacity onPress={onRightPress}>
          <Text text="View All" preset="semiBold" style={styles.rightText} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export { AppHeading };
