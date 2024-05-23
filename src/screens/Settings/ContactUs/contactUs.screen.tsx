import { FC, useState } from "react";
import { Keyboard, View, TextInput as TextInputField } from "react-native";

import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useFormikHook } from "hooks/UseFormikHook";
import { useAppSelector, RootState } from "store";
import { contactUsValidationSchema } from "utils/validations";
import { AppButton, Header, TextInput } from "components";
import styles from "./contactUs.styles";
import { colors } from "theme";

const ContactUsScreen: FC<NativeStackScreenProps<NavigatorParamList, "contactUs">> = ({ navigation }) => {
  const { darkMode } = useAppSelector((state: RootState) => state.mode);

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
    <View style={[styles.container, { backgroundColor: darkMode ? colors.black : colors.white }]}>
      <Header
        headerText="Contact Us"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
        titleStyle={{ color: darkMode ? colors.white : colors.black }}
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
