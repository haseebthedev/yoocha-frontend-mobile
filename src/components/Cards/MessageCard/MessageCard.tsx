import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { hp } from "utils/responsive";
import { Text } from "components";
import { colors } from "theme";
import { MessageItemI, RootState, useAppSelector } from "store";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import styles from "./styles";

interface MessageCardI {
  item: MessageItemI;
  onPress?: () => void;
}

const MessageCard = ({ item }: MessageCardI) => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const isSentByUser = user?._id === item.sender._id;
  const userProfilePic = isSentByUser
    ? user?.profilePicture
    : item.sender?.profilePicture;

  return (
    <View
      key={item?._id}
      style={[
        styles.messageContainer,
        { justifyContent: isSentByUser ? "flex-end" : "flex-start" },
      ]}
    >
      {!isSentByUser && (
        <Image
          source={userProfilePic ? { uri: userProfilePic } : personPlaceholder}
          style={styles.otherParticipantImage}
        />
      )}

      <View style={styles.messageTextContainer}>
        {isSentByUser && <Text text="12:05" style={styles.recieveTime} />}
        <Text
          text={item?.message}
          style={[
            styles.messageText,
            {
              backgroundColor: isSentByUser
                ? colors.primaryLight
                : colors.white,
              color: isSentByUser ? colors.white : colors.textDim,
              borderBottomRightRadius: !isSentByUser ? hp(2.5) : hp(0.4),
              borderBottomLeftRadius: isSentByUser ? hp(2.5) : hp(0.4),
            },
          ]}
        />

        {!isSentByUser && <Text text="12:05" style={styles.recieveTime} />}
      </View>
    </View>
  );
};

export { MessageCard };
