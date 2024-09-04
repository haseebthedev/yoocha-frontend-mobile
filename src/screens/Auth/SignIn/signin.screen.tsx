import { FC, useState } from "react";
import { Keyboard, TouchableOpacity, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "theme";
import { SigninI } from "interfaces";
import { ScreenEnum } from "enums";
import { getDeviceToken } from "utils/deviceInfo";
import { NavigatorParamList } from "navigators";
import { signinValidationSchema } from "utils/validations";
import { useAppTheme, useFormikHook } from "hooks";
import { AppButton, Header, LoadingIndicator, Text, TextInput } from "components";
import { signinService, useAppDispatch, useAppSelector, RootState } from "store";
import createStyles from "./signin.styles";

const SignInScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.SIGN_IN>> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.auth);

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validationSchema = signinValidationSchema;
  const initialValues: SigninI = { email: "", password: "" };

  const submit = async ({ email, password }: SigninI) => {
    try {
      Keyboard.dismiss();
      const fcmToken = await getDeviceToken();

      await dispatch(signinService({ email, password, fcmToken })).unwrap();

      resetForm();
      navigation.navigate(ScreenEnum.MAIN);
    } catch (err) {
      console.log("error === ", err);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values, setFieldValue, resetForm } =
    useFormikHook(submit, validationSchema, initialValues);

  return (
    <View style={styles.container}>
      <Header headerText="Sign In" titleStyle={{ color: theme.colors.heading }} />

      <View style={styles.form}>
        <TextInput
          label="Email"
          placeholder="Enter Email"
          value={values.email}
          onBlur={() => setFieldTouched("email")}
          onChangeText={handleChange("email")}
          error={errors.email}
          visible={touched.email}
          isEditable={!loading}
        />
        <TextInput
          label="Password"
          placeholder="Enter Password"
          isPassword={showPassword}
          value={values.password}
          rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
          onRightPress={() => setShowPassword((prev) => !prev)}
          onBlur={() => setFieldTouched("password")}
          onChangeText={handleChange("password")}
          error={errors.password}
          visible={touched.password}
          isEditable={!loading}
        />

        <AppButton
          preset="filled"
          text={loading ? "" : "Login"}
          onPress={handleSubmit}
          disabled={loading}
          style={styles.submitButton}
          RightAccessory={() => loading && <LoadingIndicator color={colors.white} />}
        />

        <TouchableOpacity style={styles.forgetPassword} onPress={() => navigation.navigate(ScreenEnum.FORGET_PASSWORD)}>
          <Text style={styles.forgetPasswordText} preset="heading">
            Forget Password?
          </Text>
        </TouchableOpacity>

        <View style={styles.dontHaveAccContainer}>
          <Text style={styles.dontHaveAccText} preset="default">
            Don't have an Account yet?
          </Text>
          <AppButton preset="link" text="Sign Up" onPress={() => navigation.navigate(ScreenEnum.SIGN_UP)} />
        </View>
      </View>
    </View>
  );
};

export { SignInScreen };
