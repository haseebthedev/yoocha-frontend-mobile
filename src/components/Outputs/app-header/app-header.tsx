import React, { ReactNode } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "components";
import { useAppTheme } from "hooks";
import createStyles from "./styles";

interface AppHeadingI {
  title: string;
  rightTitle?: ReactNode;
  onRightPress?: () => void;
}

const AppHeading: React.FC<AppHeadingI> = ({ title, rightTitle, onRightPress }) => {
  const { theme } = useAppTheme();

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text text={title} preset="heading" style={styles.headingText} />
      {rightTitle && (
        <TouchableOpacity onPress={onRightPress}>
          <Text text="View All" preset="inputText" style={styles.rightText} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export { AppHeading };
