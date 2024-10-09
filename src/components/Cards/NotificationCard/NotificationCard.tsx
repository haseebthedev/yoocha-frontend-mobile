import { Dimensions, Image, TouchableOpacity, View } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Text } from "components";
import { formatDate } from "utils/dateAndTime";
import { capitalize } from "utils/formatString";
import { useAppTheme } from "hooks";
import { NotificationI } from "store/slice/notification/types";
import personPlaceholder from "assets/images/person.png";
import createStyles from "./styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const LIST_ITEM_HEIGHT = 70;
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;
const TRASH_ICON_SIZE = 23;

interface NotificationCardI {
  item: NotificationI;
  onPress: (id: string) => void;
  onNotificationDismiss?: (id: string) => void;
}

const NotificationCard = ({ item, onPress, onNotificationDismiss }: NotificationCardI) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);
  const itemId = item._id;

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  const senderName: string =
    item.from._id === item.to._id
      ? "Yoocha"
      : `${capitalize(item.from.firstname)} ${capitalize(item.from.lastname)}` || "";
  const profileImage: string | null = item.from._id === item.to._id ? "app_logo" : item?.from.profilePicture;

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onNotificationDismiss) {
            runOnJS(onNotificationDismiss)(itemId);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    })
    .activeOffsetX([-15, 15])
    .failOffsetY([-15, 15]);

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);
    return { opacity };
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={rTaskContainerStyle}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <Ionicons name={"trash"} size={TRASH_ICON_SIZE} color={theme.colors.iconColor} />
      </Animated.View>
      <GestureDetector gesture={panGesture}>
        <AnimatedTouchableOpacity
          style={[styles.container, rStyle, !item.isRead && { backgroundColor: theme.colors.unReadBg }]}
          onPress={() => onPress(item._id)}
          activeOpacity={0.5}
        >
          <View style={styles.profileContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                source={profileImage ? { uri: profileImage } : personPlaceholder}
                style={profileImage ? styles.profileImage : styles.placeholderImage}
              />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.nameWithDate}>
                <Text preset="semiBold" text={senderName} numberOfLines={1} style={styles.name} />
                <Text preset="default" style={styles.time} text={formatDate(item.createdAt)} numberOfLines={1} />
              </View>
              <Text text={item.message} numberOfLines={1} style={styles.notificationText} />
            </View>
          </View>
        </AnimatedTouchableOpacity>
      </GestureDetector>
    </Animated.View>
  );
};

export { NotificationCard };
