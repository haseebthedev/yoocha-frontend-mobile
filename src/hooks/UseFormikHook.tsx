import { useFormik } from "formik";

export function useFormikHook(submit: any, validationSchema: any, initialValues: any) {
  const { handleChange, handleSubmit, setFieldTouched, setFieldValue, errors, touched, values, resetForm } = useFormik({
    initialValues: initialValues,
    onSubmit: submit,
    validationSchema: validationSchema,
  });

  return {
    handleChange,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
    resetForm,
  };
}
