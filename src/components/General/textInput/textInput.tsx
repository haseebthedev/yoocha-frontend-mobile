import { TextInput as ReactNativeTextInput, View, StyleSheet } from "react-native";
import { Text } from "../text/text";
import { hp, wp } from "utils/responsive";
import { TextInputProps } from "./textInput.props";
import { colors, typography } from "theme";
import { useAppTheme } from "hooks";
import ErrorMessage from "../errorMessage/error-message";
import Ionicons from "react-native-vector-icons/Ionicons";

export function TextInput(props: TextInputProps) {
  const {
    onBlur,
    rightIcon,
    onRightPress,
    value,
    label,
    isPassword,
    style: styleOverride,
    error,
    visible,
    isEditable = true,
    ...rest
  } = props;

  const { theme } = useAppTheme();
  const styles = appStyles(theme);

  const style = [styles.inputFieldStyle, styleOverride];

  return (
    <>
      {label && <Text text={label} preset="labelHeading" style={styles.label} />}

      <View>
        {/* @ts-ignore */}
        <ReactNativeTextInput
          value={value}
          style={[style, { color: theme.colors.heading }]}
          autoCapitalize="none"
          placeholderTextColor={colors.darkGrey}
          secureTextEntry={isPassword === false || undefined ? true : false}
          editable={isEditable}
          {...rest}
        />

        {rightIcon && (
          <Ionicons
            onPress={onRightPress}
            name={rightIcon}
            size={22}
            style={styles.rightIconStyle}
            color={theme.colors.iconColor}
          />
        )}
        <ErrorMessage error={error} visible={visible} />
      </View>
    </>
  );
}

const appStyles = (theme) =>
  StyleSheet.create({
    inputFieldStyle: {
      marginVertical: hp(1),
      borderColor: theme.colors.borderColor,
      borderWidth: 1,
      borderRadius: hp(1),
      paddingHorizontal: wp(4),
      fontFamily: typography.regular,
    },
    label: {
      marginTop: hp(2),
      color: theme.colors.heading,
    },
    rightIconStyle: {
      position: "absolute",
      top: hp(2.8),
      right: wp(3),
      paddingLeft: wp(3),
    },
  });
