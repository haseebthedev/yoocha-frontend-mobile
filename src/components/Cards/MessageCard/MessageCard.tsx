import { Image, View } from "react-native";

import { useState } from "react";
import { formatTime } from "utils/dateAndTime";
import { useAppTheme } from "hooks";
import { TextMessage } from "./TextMessageCard";
import { ImageMessage } from "./ImageMessageCard";
import { ImagePreview, Text } from "components";
import { MessageItemI, RootState, useAppSelector } from "store";
import userPlaceholder from "assets/images/person.png";
import createStyles from "./styles";

interface MessageCardI {
  item: MessageItemI;
}

const MessageCard = ({ item }: MessageCardI) => {
  const [viewImagePreview, setViewImagePreview] = useState<boolean>(false);

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const { user } = useAppSelector((state: RootState) => state.auth);

  const isSentByUser = user?._id === item.sender._id;
  const userProfilePic = isSentByUser ? user?.profilePicture : item.sender?.profilePicture;

  const onViewImagePress = () => {
    setViewImagePreview((prev) => !prev);
  };

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

        {item.type === "text" && <TextMessage item={item} isSentByUser={isSentByUser} />}
        {item.type === "image" && (
          <ImageMessage item={item} isSentByUser={isSentByUser} onViewImagePress={onViewImagePress} />
        )}

        {!isSentByUser && <Text text={formatTime(new Date(item.createdAt))} style={styles.recieveTime} />}
      </View>

      <ImagePreview visible={viewImagePreview} item={item} onPressClose={() => setViewImagePreview(false)} />
    </View>
  );
};

export { MessageCard };
