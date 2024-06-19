import { FC, useState } from "react";
import { Keyboard, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ScreenEnum } from "enums";
import { useFormikHook } from "hooks/UseFormikHook";
import { NavigatorParamList } from "navigators";
import { newPasswordValidation } from "utils/validations";
import { AppButton, Header, Text, TextInput } from "components";
import styles from "./resetPassword.styles";

const ResetPasswordScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.RESET_PASSWORD>> = ({
  navigation,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const validationSchema = newPasswordValidation;
  const initialValues = { newPassword: "", confirmPassword: "" };

  const submit = ({ newPassword, confirmPassword }) => {
    Keyboard.dismiss();
    navigation.navigate(ScreenEnum.SIGN_IN);
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  return (
    <View style={styles.container}>
      <Header headerText="Reset Password" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

      <View style={styles.form}>
        <View style={styles.centerContent}>
          <Text text="Enter New Password" preset="largeHeading" />
          <Text
            text="Your new password must be different from previous password."
            preset="subheading"
            style={styles.subHeading}
          />
        </View>

        <TextInput
          label="Password"
          placeholder="Enter Password"
          isPassword={showPassword}
          rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
          onRightPress={() => setShowPassword((prev) => !prev)}
          onBlur={() => setFieldTouched("newPassword")}
          onChangeText={handleChange("newPassword")}
          error={errors.newPassword}
          visible={touched.newPassword}
        />
        <TextInput
          label="Confirm Password"
          placeholder="Enter Confirm Password"
          isPassword={showConfirmPassword}
          rightIcon={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
          onRightPress={() => setShowConfirmPassword((prev) => !prev)}
          onBlur={() => setFieldTouched("confirmPassword")}
          onChangeText={handleChange("confirmPassword")}
          error={errors.confirmPassword}
          visible={touched.confirmPassword}
        />
        <AppButton preset="filled" text="Continue" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export { ResetPasswordScreen };
