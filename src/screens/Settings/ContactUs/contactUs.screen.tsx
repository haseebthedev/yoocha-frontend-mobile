import { FC, useState } from "react";
import { Keyboard, View, TextInput as TextInputField } from "react-native";

import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useFormikHook } from "hooks/UseFormikHook";
import { contactUsValidationSchema } from "utils/validations";
import { AppButton, Header, TextInput } from "components";
import { colors } from "theme";
import { useAppTheme } from "hooks";
import createStyles from "./contactUs.styles";

const ContactUsScreen: FC<NativeStackScreenProps<NavigatorParamList, "contactUs">> = ({ navigation }) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const validationSchema = contactUsValidationSchema;
  const initialValues = { name: "", email: "", message: "" };

  const submit = () => {
    try {
      Keyboard.dismiss();
      console.log("message by: ", values.name, values.email, values.message);
    } catch (error) {
      console.log("Submission Error: ", error);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  return (
    <View style={styles.container}>
      <Header
        headerText="Contact Us"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
        titleStyle={{ color: theme.colors.heading }}
      />

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
          placeholder="Type your message here"
          onBlur={() => setFieldTouched("message")}
          onChangeText={handleChange("message")}
          error={errors.message}
          visible={touched.message}
          multiline
          numberOfLines={4}
          style={{ textAlignVertical: "top" }}
        />

        <AppButton text={"Submit"} preset="filled" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export { ContactUsScreen };
