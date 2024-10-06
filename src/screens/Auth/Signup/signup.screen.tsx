import { FC, useState } from "react";
import { Keyboard, ScrollView, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "theme";
import { SignupI } from "interfaces";
import { ScreenEnum } from "enums";
import { useAppTheme } from "hooks";
import { useFormikHook } from "hooks/UseFormikHook";
import { NavigatorParamList } from "navigators";
import { signupValidationSchema } from "utils/validations";
import { AppButton, Header, LoadingIndicator, Text, TextInput } from "components";
import { signupService, useAppDispatch, useAppSelector, RootState } from "store";
import createStyles from "./signup.styles";

const SignUpScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.SIGN_UP>> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.auth);

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const validationSchema = signupValidationSchema;
  const initialValues: SignupI = { firstname: "", lastname: "", email: "", password: "", confirmPassword: "" };

  const submit = async () => {
    try {
      Keyboard.dismiss();

      await dispatch(
        signupService({
          firstname: values.firstname.trim(),
          lastname: values.lastname.trim(),
          email: values.email.trim(),
          password: values.password,
        })
      ).unwrap();

      navigation.navigate(ScreenEnum.SIGN_IN);
      resetForm();
    } catch (error) {
      console.log("Error occurred during sign-up: ", error);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values, resetForm } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  return (
    <View style={styles.container}>
      <Header
        headerText="Sign Up"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
        titleStyle={{ color: theme.colors.heading }}
      />

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <TextInput
          label="First Name"
          placeholder="Enter firstname"
          onBlur={() => setFieldTouched("firstname")}
          onChangeText={handleChange("firstname")}
          error={errors.firstname}
          visible={touched.firstname}
          value={values.firstname}
        />
        <TextInput
          label="Last Name"
          placeholder="Enter lastname"
          onBlur={() => setFieldTouched("lastname")}
          onChangeText={handleChange("lastname")}
          error={errors.lastname}
          visible={touched.lastname}
          value={values.lastname}
        />
        <TextInput
          label="Email"
          placeholder="Enter Email"
          onBlur={() => setFieldTouched("email")}
          onChangeText={handleChange("email")}
          error={errors.email}
          visible={touched.email}
          value={values.email}
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
          value={values.password}
        />

        <TextInput
          label="Confirm password"
          placeholder="Enter Confirm Password"
          isPassword={showConfirmPassword}
          rightIcon={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
          onRightPress={() => setShowConfirmPassword((prev) => !prev)}
          onBlur={() => setFieldTouched("confirmPassword")}
          onChangeText={handleChange("confirmPassword")}
          error={errors.confirmPassword}
          visible={touched.confirmPassword}
          value={values.confirmPassword}
        />

        <AppButton
          preset="filled"
          text={loading ? "" : "Sign Up"}
          onPress={handleSubmit}
          disabled={loading}
          style={styles.submitButton}
          RightAccessory={() => loading && <LoadingIndicator color={colors.white} />}
        />

        <View style={styles.haveAccContainer}>
          <Text style={styles.haveAccText} preset="default">
            Already have an Account?
          </Text>
          <AppButton preset="link" text="Sign In" onPress={() => navigation.navigate(ScreenEnum.SIGN_IN)} />
        </View>
      </ScrollView>
    </View>
  );
};

export { SignUpScreen };
