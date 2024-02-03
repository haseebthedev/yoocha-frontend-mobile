import { FC, useState } from "react";
import { Keyboard, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParamList } from "navigators";
import { Button, Header, LinkBtn, Text, TextInput } from "components";
import { signinValidationSchema } from "utils/validations";
import { useFormikHook } from "hooks/UseFormikHook";
import { useAppDispatch } from "../../../store/store";
import { signinService } from "../../../store/slice/auth/authService";
import styles from "./signin.styles";

const SignInScreen: FC<NativeStackScreenProps<NavigatorParamList, "signin">> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validationSchema = signinValidationSchema;
  const initialValues = { email: "", password: "" };

  const onPressSignup = () => {
    navigation.navigate("signup");
  };

  const onPressForgetPasswordHandler = () => {
    navigation.navigate("forgetPassword");
  };

  const submit = async ({ email, password }) => {
    Keyboard.dismiss();
    await dispatch(
      signinService({
        email,
        password,
      })
    );
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

        <Button title={"Login"} onPress={handleSubmit} />

        <TouchableOpacity style={styles.forgetPassword} onPress={onPressForgetPasswordHandler}>
          <Text style={styles.forgetPasswordText} preset="heading">
            Forget Password?
          </Text>
        </TouchableOpacity>

        <View style={styles.dontHaveAccContainer}>
          <Text style={styles.dontHaveAccText} preset="default">
            Don't have an Account yet?
          </Text>
          <LinkBtn title="Sign Up" onPress={onPressSignup} />
        </View>
      </View>
    </View>
  );
};

export { SignInScreen };
