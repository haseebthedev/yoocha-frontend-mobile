import { FC, useEffect, useRef, useState } from "react";
import { TextInput, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ScreenEnum } from "enums";
import { NavigatorParamList } from "navigators";
import { AppButton, Header, Text } from "components";
import styles from "./otpVerification.styles";

const OTPVerificationScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.OTP_VERIFICATION>> = ({
  navigation,
}) => {
  const TIMER: number = 30;
  const [timer, setTimer] = useState<number>(TIMER);
  const [otpDisableBtn, setOptDisableBtn] = useState<boolean>(false);
  const [disableResetBtn, setDisableResetBtn] = useState<boolean>(true);
  const input1 = useRef<TextInput>(null);
  const input2 = useRef<TextInput>(null);
  const input3 = useRef<TextInput>(null);
  const input4 = useRef<TextInput>(null);

  const [otp, setOtp] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
  });

  const onPressVerifyHandler = () => {
    let verificationCode = Object.values(otp).join("");

    navigation.navigate(ScreenEnum.RESET_PASSWORD);
  };

  const onPressResendCodeHandler = () => {
    setTimer(TIMER);
  };

  useEffect(() => {
    let counter: NodeJS.Timer | undefined;
    if (timer === 0) {
      clearInterval(counter);
      setOptDisableBtn(true);
    } else {
      counter = setInterval(() => setTimer((prev) => prev - 1), 1000);
      setOptDisableBtn(false);
    }
    return () => clearInterval(counter);
  }, [timer]);

  return (
    <View style={styles.container}>
      <Header headerText="Verification" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

      <View style={styles.form}>
        <View style={styles.head}>
          <Text text="Get Your Code" preset="largeHeading" />
          <Text
            text="Please enter the 4 digit code that send to your email address."
            preset="subheading"
            style={styles.subHeading}
          />
        </View>

        <View style={styles.inputFields}>
          <TextInput
            ref={input1}
            value={otp["1"]}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.codeVerifyBlock}
            selectTextOnFocus
            onFocus={() => input1.current?.focus()}
            onChangeText={(text) => {
              setOtp({ ...otp, 1: text });
              text && input2.current?.focus();
            }}
          />
          <TextInput
            ref={input2}
            value={otp["2"]}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.codeVerifyBlock}
            selectTextOnFocus
            onFocus={() => input2.current?.focus()}
            onChangeText={(text) => {
              setOtp({ ...otp, 2: text });
              text ? input3.current?.focus() : input1.current?.focus();
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                input1.current?.clear();
                input1.current?.focus();
              }
            }}
          />
          <TextInput
            ref={input3}
            value={otp["3"]}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.codeVerifyBlock}
            selectTextOnFocus
            onFocus={() => input3.current?.focus()}
            onChangeText={(text) => {
              setOtp({ ...otp, 3: text });
              text ? input4.current?.focus() : input2.current?.focus();
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                input2.current?.clear();
                input2.current?.focus();
              }
            }}
          />
          <TextInput
            ref={input4}
            value={otp["4"]}
            keyboardType="number-pad"
            maxLength={1}
            style={styles.codeVerifyBlock}
            selectTextOnFocus
            onFocus={() => input4.current?.focus()}
            onChangeText={(text) => {
              setOtp({ ...otp, 4: text });
              !text ? input3.current?.focus() : input4.current?.blur();
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                input3.current?.clear();
                input3.current?.focus();
              }
            }}
          />
        </View>

        <View style={styles.codeExpireText}>
          <Text text="Code expires in " />
          <Text text={"00 : " + timer} style={styles.timerText} />
        </View>

        <AppButton preset="filled" text="Verify" onPress={onPressVerifyHandler} />

        <View style={styles.dontRecieveCodeContainer}>
          <Text style={styles.dontRecieveCodeText} preset="default">
            If you don't receive code!
          </Text>
          <AppButton preset="link" text="Resend" onPress={onPressResendCodeHandler} disabled={disableResetBtn} />
        </View>
      </View>
    </View>
  );
};

export { OTPVerificationScreen };
