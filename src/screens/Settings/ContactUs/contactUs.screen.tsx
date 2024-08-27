import { FC, useState } from "react";
import { Keyboard, KeyboardAvoidingView, View, Platform, ScrollView } from "react-native";

import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { colors } from "theme";
import { ScreenEnum } from "enums";
import { ContactUsI } from "interfaces";
import { capitalize } from "utils/formatString";
import { contactUsValidationSchema } from "utils/validations";
import { useAppTheme, useFormikHook } from "hooks";
import { AlertBox, AppButton, Header, LoadingIndicator, TextInput } from "components";
import { contactUsService, RootState, useAppDispatch, useAppSelector } from "store";
import createStyles from "./contactUs.styles";

const ContactUsScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.CONTACT_US>> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state: RootState) => state.auth);
  const username: string = `${capitalize(user?.firstname)} ${capitalize(user?.lastname || "")}`;

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);

  const validationSchema = contactUsValidationSchema;
  const initialValues: ContactUsI = { name: username, email: user?.email, message: "" };

  const onCloseAlertBoxPress = () => {
    setSuccessModalVisible((prev) => !prev);
    navigation.goBack();
  };

  const submit = async ({ name, email, message }) => {
    try {
      Keyboard.dismiss();
      await dispatch(contactUsService({ name, email, message })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setSuccessModalVisible(true);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            value={values.name}
            onBlur={() => setFieldTouched("name")}
            onChangeText={handleChange("name")}
            error={errors.name}
            visible={touched.name}
            isEditable={false}
          />
          <TextInput
            label="Email"
            placeholder="Enter Email"
            value={values.email}
            onBlur={() => setFieldTouched("email")}
            onChangeText={handleChange("email")}
            error={errors.email}
            visible={touched.email}
            isEditable={false}
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
            isEditable={!loading}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export { ContactUsScreen };
