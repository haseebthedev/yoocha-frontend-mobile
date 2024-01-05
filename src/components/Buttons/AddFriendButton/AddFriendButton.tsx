import { ButtonProps, TouchableOpacity } from "react-native";
import { Text } from "components";
import { colors } from "theme";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";

interface ButtonI extends ButtonProps {
  onPress?: () => void;
}

const AddFriendButton = ({ onPress }: ButtonI) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.addFriendBlock}>
      <Ionicons name="person-add-outline" color={colors.white} size={13} />
      <Text text="Add Friend" style={styles.addFriendText} />
    </TouchableOpacity>
  );
};

export { AddFriendButton };
