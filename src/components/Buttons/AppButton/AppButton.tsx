import { Text } from "components/General/text/text";
import { TextProps } from "components/General/text/text.props";
import React, { ComponentType } from "react";
import { Pressable, PressableProps, PressableStateCallbackType, StyleProp, TextStyle, ViewStyle } from "react-native";
import { colors, typography } from "theme";
import { hp, wp } from "utils/responsive";

type Presets = keyof typeof $viewPresets;

export interface ButtonAccessoryProps {
  style: StyleProp<any>;
  pressableState: PressableStateCallbackType;
}

export interface ButtonProps extends PressableProps {
  text?: TextProps["text"];
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  pressedTextStyle?: StyleProp<TextStyle>;
  preset?: Presets;
  RightAccessory?: ComponentType<ButtonAccessoryProps>;
  LeftAccessory?: ComponentType<ButtonAccessoryProps>;
  children?: React.ReactNode;
  onPress?: () => void;
}

export function AppButton(props: ButtonProps) {
  const {
    text,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    onPress,
    ...rest
  } = props;

  const preset: Presets = $viewPresets[props.preset ?? "default"] ? props.preset ?? "default" : "default";

  function $viewStyle({ pressed }: PressableStateCallbackType) {
    return [
      $viewPresets[preset],
      $viewStyleOverride,
      !!pressed && [$pressedViewPresets[preset], $pressedViewStyleOverride],
    ];
  }
  function $textStyle({ pressed }: PressableStateCallbackType) {
    return [
      $textPresets[preset],
      $textStyleOverride,
      !!pressed && [$pressedTextPresets[preset], $pressedTextStyleOverride],
    ];
  }

  return (
    <Pressable style={$viewStyle} accessibilityRole="button" {...rest} onPress={onPress}>
      {(state) => (
        <>
          {!!LeftAccessory && <LeftAccessory style={$leftAccessoryStyle} pressableState={state} />}

          <Text text={text} style={$textStyle(state)}>
            {children}
          </Text>

          {!!RightAccessory && <RightAccessory style={$rightAccessoryStyle} pressableState={state} />}
        </>
      )}
    </Pressable>
  );
}

const $baseViewStyle: ViewStyle = {
  width: "100%",
  alignSelf: "center",
  minHeight: 50,
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  paddingVertical: hp(1.8),
  marginVertical: hp(1),
  // paddingHorizontal: spacing.sm,
  overflow: "hidden",
};

const $baseTextStyle: TextStyle = {
  fontSize: 16,
  lineHeight: 20,
  color: colors.primary,
  fontFamily: typography.bold,
  textAlign: "center",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
};

const $rightAccessoryStyle: ViewStyle = { marginStart: 20, zIndex: 1 };
const $leftAccessoryStyle: ViewStyle = { marginEnd: 20, zIndex: 1 };

const $viewPresets = {
  default: [
    $baseViewStyle,
    {
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.white,
    },
  ] as StyleProp<ViewStyle>,

  filled: [$baseViewStyle, { backgroundColor: colors.primary }] as StyleProp<ViewStyle>,
  link: [
    // $baseViewStyle,
    {
      //   borderBottomWidth: 1,
      //   borderBottomColor: colors.primary,
      //   backgroundColor: colors.white,
    },
  ] as StyleProp<ViewStyle>,
};

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: $baseTextStyle,
  filled: [$baseTextStyle, { color: colors.white }],
  link: [
    $baseTextStyle,
    {
      fontFamily: typography.semiBold,
      fontSize: hp(1.7),
      color: colors.primaryLight,
      marginHorizontal: wp(1),
      textDecorationLine: "underline",
    },
  ],
};

const $pressedViewPresets: Record<Presets, StyleProp<ViewStyle>> = {
  default: { backgroundColor: colors.lightShade },
  filled: { backgroundColor: colors.primary },
  link: { backgroundColor: colors.white },
};

const $pressedTextPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: { opacity: 0.9 },
  filled: { opacity: 0.9 },
  link: { opacity: 0.5 },
};
