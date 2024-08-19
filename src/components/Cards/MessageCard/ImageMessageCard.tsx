import { Image, TouchableOpacity } from "react-native";

import { hp } from "utils/responsive";
import { colors } from "theme";
import { useAppTheme } from "hooks";
import { MessageItemI } from "store";
import createStyles from "./styles";

interface ImageMessageI {
  item: MessageItemI;
  isSentByUser: boolean;
  onViewImagePress: () => void;
}

const ImageMessage = ({ item, isSentByUser, onViewImagePress }: ImageMessageI) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.messageImageContainer,
        {
          backgroundColor: isSentByUser ? colors.primaryLight : theme.colors.messageCardBg,
          borderBottomRightRadius: !isSentByUser ? hp(2.5) : hp(0.4),
          borderBottomLeftRadius: isSentByUser ? hp(2.5) : hp(0.4),
        },
      ]}
      onPress={onViewImagePress}
    >
      {item?.files?.map((item, index) => (
        <Image source={{ uri: item }} style={styles.messageImage} key={index} />
      ))}
    </TouchableOpacity>
  );
};

export { ImageMessage };
