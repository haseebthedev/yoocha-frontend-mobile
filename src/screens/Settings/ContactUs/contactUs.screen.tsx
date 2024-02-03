import { FC } from "react";
import { Keyboard, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParamList } from "navigators";
import { Button, Header, TextInput } from "components";
import { contactUsValidationSchema } from "utils/validations";
import { useFormikHook } from "hooks/UseFormikHook";
import styles from "./contactUs.styles";

const ContactUsScreen: FC<NativeStackScreenProps<NavigatorParamList, "contactUs">> = ({ navigation }) => {
  const validationSchema = contactUsValidationSchema;
  const initialValues = { name: "", email: "", message: "" };

  const submit = ({ name, email, message }) => {
    Keyboard.dismiss();
    console.log("message by: ", name, email, message);
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  return (
    <View style={styles.container}>
      <Header headerText="Contact Us" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

      <View style={styles.form}>
        <TextInput
          label="Name"
          placeholder="Enter Name"
          onBlur={() => setFieldTouched("name")}
          onChangeText={handleChange("name")}
          error={errors.name}
          visible={touched.name}
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
          label="message"
          placeholder="Enter Message"
          onBlur={() => setFieldTouched("message")}
          onChangeText={handleChange("message")}
          error={errors.message}
          visible={touched.message}
          multiline
          numberOfLines={4}
        />

        <Button title={"Submit"} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export { ContactUsScreen };