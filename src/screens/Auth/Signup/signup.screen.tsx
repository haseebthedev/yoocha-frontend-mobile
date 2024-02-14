import { FC, useState } from "react";
import { ActivityIndicator, Keyboard, ScrollView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParamList } from "navigators";
import { AppButton, Header, Text, TextInput } from "components";
import { signupValidationSchema } from "utils/validations";
import { useFormikHook } from "hooks/UseFormikHook";
import { signupService, useAppDispatch } from "store";
import { SignupI } from "interfaces/auth";
import styles from "./signup.styles";

const SignUpScreen: FC<NativeStackScreenProps<NavigatorParamList, "signup">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = signupValidationSchema;
  const initialValues: SignupI = { firstname: "", lastname: "", email: "", password: "", confirmPassword: "" };

  const submit = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await dispatch(
        signupService({
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
        })
      );

      navigation.navigate("signin");
    } catch (error) {
      console.error("Error occurred during sign-up:", error);
    } finally {
      setLoading(false);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  return (
    <View style={styles.container}>
      <Header headerText="Sign Up" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <TextInput
          label="First Name"
          placeholder="Enter firstname"
          onBlur={() => setFieldTouched("firstname")}
          onChangeText={handleChange("firstname")}
          error={errors.firstname}
          visible={touched.firstname}
        />
        <TextInput
          label="Last Name"
          placeholder="Enter lastname"
          onBlur={() => setFieldTouched("lastname")}
          onChangeText={handleChange("lastname")}
          error={errors.lastname}
          visible={touched.lastname}
        />
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

        <TextInput
          label="Confirm password"
          placeholder="Enter Confirm Password"
          isPassword={showPassword}
          rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
          onRightPress={() => setShowPassword((prev) => !prev)}
          onBlur={() => setFieldTouched("confirmPassword")}
          onChangeText={handleChange("confirmPassword")}
          error={errors.confirmPassword}
          visible={touched.confirmPassword}
        />

        <AppButton
          preset="filled"
          text={loading ? "" : "Sign Up"}
          onPress={handleSubmit}
          disabled={loading}
          RightAccessory={() => loading && <ActivityIndicator color="white" />}
        />

        <View style={styles.haveAccContainer}>
          <Text style={styles.haveAccText} preset="default">
            Already have an Account?
          </Text>
          <AppButton preset="link" text="Sign In" onPress={() => navigation.navigate("signin")} />
        </View>
      </ScrollView>
    </View>
  );
};

export { SignUpScreen };
