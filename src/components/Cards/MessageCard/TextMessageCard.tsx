import { hp } from "utils/responsive";
import { Text } from "components/General/text/text";
import { colors } from "theme";
import { useAppTheme } from "hooks";
import { MessageItemI } from "store";
import createStyles from "./styles";

interface TextMessageI {
  item: MessageItemI;
  isSentByUser: boolean;
}

const TextMessage = ({ item, isSentByUser }: TextMessageI) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <Text
      text={item?.message}
      style={[
        styles.messageText,
        {
          backgroundColor: isSentByUser ? colors.primaryLight : theme.colors.messageCardBg,
          color: isSentByUser ? colors.white : theme.colors.heading,
          borderBottomRightRadius: !isSentByUser ? hp(2.5) : hp(0.4),
          borderBottomLeftRadius: isSentByUser ? hp(2.5) : hp(0.4),
        },
      ]}
    />
  );
};

export { TextMessage };
