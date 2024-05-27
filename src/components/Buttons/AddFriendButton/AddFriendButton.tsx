import { ButtonProps, TouchableOpacity } from "react-native";
import { Text } from "components";
import { colors } from "theme";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";

interface ButtonI extends ButtonProps {
  onPress?: () => void;
  title: string;
}

const AddFriendButton = ({ onPress, title }: ButtonI) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.addFriendBlock} activeOpacity={0.5}>
      <Ionicons name="person-add-outline" color={colors.white} size={13} />
      <Text text={title} style={styles.addFriendText} />
    </TouchableOpacity>
  );
};

export { AddFriendButton };
