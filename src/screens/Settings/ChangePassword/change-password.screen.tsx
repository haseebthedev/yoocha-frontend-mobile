import { FC, useState } from "react";
import { Keyboard, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParamList } from "navigators";
import { AppButton, Header, TextInput } from "components";
import { useFormikHook } from "hooks/UseFormikHook";
import { changePasswordValidationSchema } from "utils/validations";
import styles from "./change-password.styles";
import { changePasswordService, useAppDispatch } from "store";

const ChangePasswordScreen: FC<NativeStackScreenProps<NavigatorParamList, "changePassword">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const validationSchema = changePasswordValidationSchema;
  const initialValues = { currentPassword: "", newPassword: "", confirmPassword: "" };

  const submit = async ({ currentPassword, newPassword }) => {
    Keyboard.dismiss();
    await dispatch(changePasswordService({ oldPassword: currentPassword, newPassword }));
    navigation.goBack();
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  return (
    <View style={styles.container}>
      <Header headerText="Change Password" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

      <View style={styles.form}>
        <TextInput
          label="Current Password"
          placeholder="Enter Current Password"
          isPassword={showPassword}
          rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
          onRightPress={() => setShowPassword((prev) => !prev)}
          onBlur={() => setFieldTouched("currentPassword")}
          onChangeText={handleChange("currentPassword")}
          error={errors.currentPassword}
          visible={touched.currentPassword}
        />
        <TextInput
          label="New Password"
          placeholder="Enter New Password"
          isPassword={showNewPassword}
          rightIcon={showNewPassword ? "eye-off-outline" : "eye-outline"}
          onRightPress={() => setShowNewPassword((prev) => !prev)}
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
        <AppButton preset="filled" text="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export { ChangePasswordScreen };
