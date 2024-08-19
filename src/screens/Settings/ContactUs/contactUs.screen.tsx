import { FC, useState } from "react";
import { Keyboard, View } from "react-native";

import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "theme";
import { ContactUsI } from "interfaces";
import { ScreenEnum } from "enums";
import { useAppTheme } from "hooks";
import { useFormikHook } from "hooks/UseFormikHook";
import { contactUsValidationSchema } from "utils/validations";
import { contactUsService, useAppDispatch } from "store";
import { AlertBox, AppButton, Header, LoadingIndicator, TextInput } from "components";
import createStyles from "./contactUs.styles";

const ContactUsScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.CONTACT_US>> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [loading, setLoading] = useState<boolean>(false);
  const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);

  const validationSchema = contactUsValidationSchema;
  const initialValues: ContactUsI = { name: "", email: "", message: "" };

  const onCloseAlertBoxPress = () => {
    setSuccessModalVisible((prev) => !prev);
    navigation.goBack();
  };

  const submit = async ({ name, email, message }) => {
    Keyboard.dismiss();
    setLoading(true);
    await dispatch(contactUsService({ name, email, message }))
      .unwrap()
      .catch((error) => console.log(error.message))
      .finally(() => {
        setLoading(false);
        setSuccessModalVisible(true);
      });
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
          label="Message"
          placeholder="Type your message here"
          onBlur={() => setFieldTouched("message")}
          onChangeText={handleChange("message")}
          error={errors.message}
          visible={touched.message}
          multiline
          numberOfLines={4}
          style={{ textAlignVertical: "top" }}
        />

        <AppButton
          preset="filled"
          text={loading ? "" : "Submit"}
          onPress={handleSubmit}
          disabled={loading}
          RightAccessory={() => loading && <LoadingIndicator color={colors.white} />}
        />
      </View>

      <AlertBox
        checkIcon={true}
        open={successModalVisible}
        type="success"
        description="Your message has been sent successfully."
        onClose={onCloseAlertBoxPress}
      />
    </View>
  );
};

export { ContactUsScreen };
