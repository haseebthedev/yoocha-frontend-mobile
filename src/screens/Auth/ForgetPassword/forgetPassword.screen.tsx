import { FC } from "react";
import { Keyboard, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParamList } from "navigators";
import { Button, Header, Text, TextInput } from "components";
import { forgotPasswordValidation } from "utils/validations";
import { useFormikHook } from "hooks/UseFormikHook";
import styles from "./forgetPassword.styles";
import { forgetPasswordService, useAppDispatch } from "../../../store";

const ForgetPasswordScreen: FC<NativeStackScreenProps<NavigatorParamList, "forgetPassword">> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const validationSchema = forgotPasswordValidation;
  const initialValues = { email: "" };

  const submit = async ({ email }) => {
    Keyboard.dismiss();
    await dispatch(forgetPasswordService({ email: email }));
    navigation.navigate("otpVerification");
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  return (
    <View style={styles.container}>
      <Header headerText="Forget Password" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

      <View style={styles.form}>
        <View style={{ alignItems: "center" }}>
          <Text text="Recover Your Account" preset="largeHeading" />
          <Text
            text="Enter the email address associated with your account."
            preset="subheading"
            style={styles.subHeading}
          />
        </View>

        <TextInput
          label="Email"
          placeholder="Enter Email"
          onBlur={() => setFieldTouched("email")}
          onChangeText={handleChange("email")}
          error={errors.email}
          visible={touched.email}
        />
        <Button title={"Recover Password"} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export { ForgetPasswordScreen };
