import { FC, useState } from "react";
import { Keyboard, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParamList } from "navigators";
import { Button, Header, TextInput } from "components";
import { useFormikHook } from "hooks/UseFormikHook";
import { changePasswordValidationSchema } from "utils/validations";
import styles from "./change-password.styles";

const ChangePasswordScreen: FC<NativeStackScreenProps<NavigatorParamList, "changePassword">> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const validationSchema = changePasswordValidationSchema;
  const initialValues = { currentPassword: "", newPassword: "", confirmPassword: "" };

  const submit = ({ currentPassword, newPassword, confirmPassword }) => {
    Keyboard.dismiss();
    navigation.navigate("signin");
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
        <Button title={"Submit"} onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

export { ChangePasswordScreen };
