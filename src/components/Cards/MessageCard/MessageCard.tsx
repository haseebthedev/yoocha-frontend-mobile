import { Image, View } from "react-native";
import { hp } from "utils/responsive";
import { Text } from "components";
import { colors } from "theme";
import { MessageItemI, RootState, useAppSelector } from "store";
import { formatTime } from "utils/dateAndTime";
import userPlaceholder from "assets/images/person.png";
import createStyles from "./styles";
import { useAppTheme } from "hooks";

interface MessageCardI {
  item: MessageItemI;
  onPress?: () => void;
}

const MessageCard = ({ item }: MessageCardI) => {
  const { theme, darkMode } = useAppTheme();
  const styles = createStyles(theme);

  const { user } = useAppSelector((state: RootState) => state.auth);

  const isSentByUser = user?._id === item.sender._id;
  const userProfilePic = isSentByUser ? user?.profilePicture : item.sender?.profilePicture;

  return (
    <View
      key={item?._id}
      style={[styles.messageContainer, { justifyContent: isSentByUser ? "flex-end" : "flex-start" }]}
    >
      {!isSentByUser && (
        <View style={!userProfilePic && styles.profileImageContainer}>
          <Image
            source={userProfilePic ? { uri: userProfilePic } : userPlaceholder}
            style={userProfilePic ? styles.otherParticipantImage : styles.placeholderImage}
          />
        </View>
      )}

      <View style={styles.messageTextContainer}>
        {isSentByUser && <Text text={formatTime(new Date(item.createdAt))} style={styles.recieveTime} />}
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

        {!isSentByUser && <Text text={formatTime(new Date(item.createdAt))} style={styles.recieveTime} />}
      </View>
    </View>
  );
};

export { MessageCard };
