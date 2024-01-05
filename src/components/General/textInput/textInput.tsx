import * as React from "react";
import { TextInput as ReactNativeTextInput, View } from "react-native";
import { TextInputProps } from "./textInput.props";
import { StyleSheet } from "react-native";
import { hp, wp } from "utils/responsive";
import { colors, typography } from "theme";
import { Text } from "../text/text";
import Ionicons from "react-native-vector-icons/Ionicons";
import ErrorMessage from "../errorMessage/error-message";

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
    ...rest
  } = props;

  const style = [styles.inputFieldStyle, styleOverride];

  return (
    <>
      {label && <Text text={label} preset="labelHeading" style={styles.label} />}

      <View>
        <ReactNativeTextInput
          value={value}
          style={style}
          autoCapitalize="none"
          placeholderTextColor={colors.darkGrey}
          secureTextEntry={isPassword === false || undefined ? true : false}
          {...rest}
        />

        {rightIcon && <Ionicons onPress={onRightPress} name={rightIcon} size={22} style={styles.rightIconStyle} />}
        <ErrorMessage error={error} visible={visible} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputFieldStyle: {
    marginVertical: hp(1),
    borderColor: colors.lightShade,
    borderWidth: 1,
    borderRadius: hp(1),
    paddingHorizontal: wp(4),
    fontFamily: typography.regular,
  },
  label: {
    marginTop: hp(2),
  },
  rightIconStyle: {
    position: "absolute",
    top: hp(2.8),
    right: wp(3),
    backgroundColor: "white",
    paddingLeft: wp(3),
  },
});
