import { FC } from "react";
import { Keyboard, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParamList } from "navigators";
import { AppButton, Header, TextInput } from "components";
import { reportAnIssueValidationSchema } from "utils/validations";
import { useFormikHook } from "hooks/UseFormikHook";
import { ReportIssueFormI } from "interfaces/auth";
import styles from "./reportIssue.styles";

const ReportIssue: FC<NativeStackScreenProps<NavigatorParamList, "reportIssue">> = ({ navigation }) => {
  const validationSchema = reportAnIssueValidationSchema;
  const initialValues: ReportIssueFormI = { name: "", email: "", message: "" };

  const submit = ({ name, email, message }: ReportIssueFormI) => {
    Keyboard.dismiss();
    console.log("Report: ", name, email, message);
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  return (
    <View style={styles.container}>
      <Header headerText="Report an Issue" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

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
        <AppButton preset="filled" text="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export { ReportIssue };
