import { FC } from "react";
import { Keyboard, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ScreenEnum } from "enums";
import { useFormikHook } from "hooks/UseFormikHook";
import { ForgetPasswordI } from "interfaces/auth";
import { NavigatorParamList } from "navigators";
import { forgotPasswordValidation } from "utils/validations";
import { Header, Text, TextInput, AppButton } from "components";
import { forgetPasswordService, useAppDispatch } from "store";
import styles from "./forgetPassword.styles";

const ForgetPasswordScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.FORGET_PASSWORD>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();

  const validationSchema = forgotPasswordValidation;
  const initialValues: ForgetPasswordI = { email: "" };

  const submit = async ({ email }: ForgetPasswordI) => {
    Keyboard.dismiss();
    await dispatch(forgetPasswordService({ email }));
    navigation.navigate(ScreenEnum.OTP_VERIFICATION);
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  return (
    <View style={styles.container}>
      <Header headerText="Forget Password" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

      <View style={styles.form}>
        <View style={styles.centerContent}>
          <Text text="Recover Your Account" preset="largeHeading" />
          <Text
            text="Enter the email address associated with your account."
            preset="subheading"
            style={styles.subHeading}
          />
        </View>

        <TextInput
          label="Email"
          placeholder="Enter Email"
          onBlur={() => setFieldTouched("email")}
          onChangeText={handleChange("email")}
          error={errors.email}
          visible={touched.email}
        />
        <AppButton text={"Recover Password"} preset="filled" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export { ForgetPasswordScreen };
