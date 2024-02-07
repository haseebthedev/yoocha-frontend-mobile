import { FC, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { AlertBox, AppButton, CountryPickerModal, Header, ImagePickerModal, Text, TextInput } from "components";
import { colors } from "theme";
import { UpdateUserI } from "interfaces/user";
import { useFormikHook } from "hooks/UseFormikHook";
import { formatDateToDMY } from "utils/formatDateAndTime";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { editAccountValidationSchema } from "utils/validations";
import { RootState, updateUserService, useAppDispatch, useAppSelector } from "store";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import DatePicker from "react-native-date-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./edit-profile.styles";

const EditProfileScreen: FC<NativeStackScreenProps<NavigatorParamList, "editprofile">> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [countryModalVisible, setCountryModalVisible] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("Pakistan");
  const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<any>(personPlaceholder);
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);

  const validationSchema = editAccountValidationSchema;
  const initialValues: UpdateUserI = { firstName: user?.firstname, lastName: user?.lastname };

  const closeModal = () => setImageModalVisible((prev) => !prev);
  const handleImageBackdropPress = () => closeModal();

  const onCloseAlertBoxPress = () => {
    setSuccessModalVisible((prev) => !prev);
    navigation.goBack();
  };

  const uploadProfileImage = async () => setImageModalVisible((prev) => !prev);

  const submit = async ({ firstName, lastName }: UpdateUserI) => {
    setSuccessModalVisible((prev) => !prev);
    await dispatch(updateUserService({ firstName, lastName }));
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header headerText="Edit Profile" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

      <View style={styles.mainContainer}>
        <View style={styles.imgContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <TouchableOpacity style={styles.changeImageBtn} onPress={uploadProfileImage}>
            <Ionicons name="camera" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <TextInput
            label="First Name"
            placeholder="Enter First Name"
            value={values.firstName}
            onBlur={() => setFieldTouched("firstName")}
            onChangeText={handleChange("firstName")}
            error={errors.firstName}
            visible={touched.firstName}
          />

          <TextInput
            label="Last Name"
            placeholder="Enter Last Name"
            value={values.lastName}
            onBlur={() => setFieldTouched("lastName")}
            onChangeText={handleChange("lastName")}
            error={errors.lastName}
            visible={touched.lastName}
          />

          <TextInput label="Email" value={`${user?.email}`} />

          <Text text="Date of Birth" preset="labelHeading" style={styles.topSpacing} />
          <TouchableOpacity onPress={() => setOpen(true)} style={styles.pickerInputField}>
            <Text text={date ? formatDateToDMY(date) : "Select Date"} preset="inputText" />
          </TouchableOpacity>

          <Text text="Country / Region" preset="labelHeading" style={styles.topSpacing} />
          <TouchableOpacity onPress={() => setCountryModalVisible((prev) => !prev)} style={styles.pickerInputField}>
            <Text text={selectedCountry} preset="inputText" />
          </TouchableOpacity>
        </View>

        <AppButton preset="filled" text={"Save Changes"} onPress={handleSubmit} />
      </View>

      <CountryPickerModal
        visible={countryModalVisible}
        setSelectedCountry={setSelectedCountry}
        setCountryModalVisible={setCountryModalVisible}
      />

      <AlertBox
        checkIcon={true}
        open={successModalVisible}
        type="success"
        description="Your profile has been updated successfully."
        onClose={onCloseAlertBoxPress}
      />

      <ImagePickerModal
        title="Select an option!"
        isVisible={imageModalVisible}
        onModalClose={closeModal}
        onBackdropPress={handleImageBackdropPress}
        setProfileImage={setProfileImage}
      />

      <DatePicker
        title={"Select Date"}
        mode="date"
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen((prev) => !prev);
          setDate(date);
        }}
        onCancel={() => {
          setOpen((prev) => !prev);
        }}
      />
    </ScrollView>
  );
};

export { EditProfileScreen };
