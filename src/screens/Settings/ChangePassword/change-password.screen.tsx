import { FC, useState } from "react";
import { Keyboard, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "theme";
import { ScreenEnum } from "enums";
import { useAppTheme } from "hooks";
import { useFormikHook } from "hooks/UseFormikHook";
import { ChangePasswordI } from "interfaces/user";
import { NavigatorParamList } from "navigators";
import { changePasswordValidationSchema } from "utils/validations";
import { AppButton, Header, LoadingIndicator, TextInput } from "components";
import { RootState, changePasswordService, useAppDispatch, useAppSelector } from "store";
import createStyles from "./change-password.styles";

const ChangePasswordScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.CHANGE_PASSWORD>> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.auth);

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const validationSchema = changePasswordValidationSchema;
  const initialValues: ChangePasswordI = { currentPassword: "", newPassword: "", confirmPassword: "" };

  const submit = async ({ currentPassword, newPassword }: ChangePasswordI) => {
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
      <Header
        headerText="Change Password"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
        titleStyle={{ color: theme.colors.heading }}
      />

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
          style={{ color: theme.colors.bgColor }}
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

        <AppButton
          preset="filled"
          text={loading ? "" : "Save"}
          onPress={handleSubmit}
          disabled={loading}
          RightAccessory={() => loading && <LoadingIndicator color={colors.white} />}
        />
      </View>
    </View>
  );
};

export { ChangePasswordScreen };
