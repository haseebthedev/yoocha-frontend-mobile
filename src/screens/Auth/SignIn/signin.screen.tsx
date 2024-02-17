import { FC, useState } from "react";
import { ActivityIndicator, Keyboard, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParamList } from "navigators";
import { AppButton, Header, Text, TextInput } from "components";
import { signinValidationSchema } from "utils/validations";
import { useFormikHook } from "hooks/UseFormikHook";
import { signinService, useAppDispatch } from "store";
import { SigninI } from "interfaces/auth";
import styles from "./signin.styles";

const SignInScreen: FC<NativeStackScreenProps<NavigatorParamList, "signin">> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = signinValidationSchema;
  const initialValues: SigninI = { email: "", password: "" };

  const submit = async ({ email, password }: SigninI) => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await dispatch(signinService({ email, password }));
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
      <Header headerText="Sign In" />

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
          RightAccessory={() => loading && <ActivityIndicator color="white" />}
        />

        <TouchableOpacity style={styles.forgetPassword} onPress={() => navigation.navigate("forgetPassword")}>
          <Text style={styles.forgetPasswordText} preset="heading">
            Forget Password?
          </Text>
        </TouchableOpacity>

        <View style={styles.dontHaveAccContainer}>
          <Text style={styles.dontHaveAccText} preset="default">
            Don't have an Account yet?
          </Text>
          <AppButton preset="link" text="Sign Up" onPress={() => navigation.navigate("signup")} />
        </View>
      </View>
    </View>
  );
};

export { SignInScreen };
