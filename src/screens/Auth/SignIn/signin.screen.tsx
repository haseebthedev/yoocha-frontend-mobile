import { FC, useState } from "react";
import { Keyboard, TouchableOpacity, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "theme";
import { SigninI } from "interfaces";
import { ScreenEnum } from "enums";
import { useFormikHook } from "hooks/UseFormikHook";
import { NavigatorParamList } from "navigators";
import { signinValidationSchema } from "utils/validations";
import { signinService, useAppDispatch } from "store";
import { AppButton, Header, LoadingIndicator, Text, TextInput } from "components";
import { useAppTheme } from "hooks";
import createStyles from "./signin.styles";

const SignInScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.SIGN_IN>> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = signinValidationSchema;
  const initialValues: SigninI = { email: "", password: "" };

  const submit = async ({ email, password }: SigninI) => {
    Keyboard.dismiss();
    setLoading(true);
    await dispatch(signinService({ email, password }))
      .unwrap()
      .then((response) => navigation.navigate(ScreenEnum.MAIN))
      .catch((error) => console.log(error.message))
      .finally(() => {
        // resetForm();
        setLoading(false);
      });
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
          onBlur={() => setFieldTouched("email")}
          onChangeText={handleChange("email")}
          error={errors.email}
          visible={touched.email}
        />
        <TextInput
          label="Password"
          placeholder="Enter Password"
          isPassword={showPassword}
          rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
          onRightPress={() => setShowPassword((prev) => !prev)}
          onBlur={() => setFieldTouched("password")}
          onChangeText={handleChange("password")}
          error={errors.password}
          visible={touched.password}
        />

        <AppButton
          preset="filled"
          text={loading ? "" : "Login"}
          onPress={handleSubmit}
          disabled={loading}
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
