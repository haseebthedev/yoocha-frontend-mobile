import { FC, useState } from "react";
import { Keyboard, ScrollView, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParamList } from "navigators";
import { Button, Header, LinkBtn, Text, TextInput } from "components";
import { signupValidationSchema } from "utils/validations";
import { useFormikHook } from "hooks/UseFormikHook";
import { useAppDispatch } from "../../../store/store";
import { signupService } from "../../../store/slice/auth/authService";
import styles from "./signup.styles";

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpScreen: FC<NativeStackScreenProps<NavigatorParamList, "signup">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validationSchema = signupValidationSchema;
  const initialValues: SignupFormValues = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

  const onPressSignin = () => {
    navigation.navigate("signin");
  };

  const submit = async (values: SignupFormValues) => {
    Keyboard.dismiss();
    await dispatch(
      signupService({
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        navigation.navigate("signin");
      });
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
          placeholder="Enter Firstname"
          onBlur={() => setFieldTouched("firstName")}
          onChangeText={handleChange("firstName")}
          error={errors.firstName}
          visible={touched.firstName}
        />
        <TextInput
          label="Last Name"
          placeholder="Enter Lastname"
          onBlur={() => setFieldTouched("lastName")}
          onChangeText={handleChange("lastName")}
          error={errors.lastName}
          visible={touched.lastName}
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

        <Button title={"Sign Up"} onPress={handleSubmit} />

        <View style={styles.haveAccContainer}>
          <Text style={styles.haveAccText} preset="default">
            Already have an Account?
          </Text>
          <LinkBtn title="Sign In" onPress={onPressSignin} />
        </View>
      </ScrollView>
    </View>
  );
};

export { SignUpScreen };
