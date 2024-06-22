import { FC } from "react";
import { Keyboard, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ScreenEnum } from "enums";
import { ReportIssueI } from "interfaces/auth";
import { useFormikHook } from "hooks/UseFormikHook";
import { NavigatorParamList } from "navigators";
import { AppButton, Header, TextInput } from "components";
import { reportAnIssueValidationSchema } from "utils/validations";
import { useAppTheme } from "hooks";
import createStyles from "./reportIssue.styles";

const ReportIssue: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.REPORT_ISSUE>> = ({ navigation }) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const validationSchema = reportAnIssueValidationSchema;
  const initialValues: ReportIssueI = { name: "", email: "", message: "" };

  const submit = ({ name, email, message }: ReportIssueI) => {
    Keyboard.dismiss();
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  return (
    <View style={styles.container}>
      <Header
        headerText="Report an Issue"
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
          placeholder="Type your issue here"
          onBlur={() => setFieldTouched("message")}
          onChangeText={handleChange("message")}
          error={errors.message}
          visible={touched.message}
          multiline
          numberOfLines={4}
          style={{ textAlignVertical: "top" }}
        />
        <AppButton preset="filled" text="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export { ReportIssue };
