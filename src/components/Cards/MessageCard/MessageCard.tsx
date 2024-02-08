import { Image, View } from "react-native";
import { Text } from "components";
import { colors } from "theme";
import { MessageI } from "interfaces";
import { RootState, useAppSelector } from "store";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import styles from "./styles";

interface MessageCardI {
  item: MessageI;
  onPress?: () => void;
}

const MessageCard = ({ item }: MessageCardI) => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <View
      key={item?._id}
      style={[styles.messageContainer, { justifyContent: item?.sender?._id === user?._id ? "flex-end" : "flex-start" }]}
    >
      {item?.sender?._id !== user?._id && <Image source={personPlaceholder} style={styles.otherParticipantImage} />}

      <View style={styles.messageTextContainer}>
        {item?.sender?._id === user?._id && <Text text="12:05" style={styles.recieveTime} />}
        <Text
          text={item?.message}
          style={[
            styles.messageText,
            {
              backgroundColor: item?.sender?._id === user?._id ? colors.primaryLight : colors.white,
              color: item?.sender?._id === user?._id ? colors.white : colors.textDim,
              borderBottomRightRadius: item?.sender?._id != user?._id ? 20 : 5,
              borderBottomLeftRadius: item?.sender?._id === user?._id ? 20 : 5,
            },
          ]}
        />

        {item?.sender?._id != user?._id && <Text text="12:05" style={styles.recieveTime} />}
      </View>
    </View>
  );
};

export { MessageCard };
