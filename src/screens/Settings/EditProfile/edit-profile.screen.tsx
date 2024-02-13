import { FC, useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "theme";
import { UpdateUserI } from "interfaces/user";
import { useFormikHook } from "hooks/UseFormikHook";
import { formatDateToDMY } from "utils/dateAndTime";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { editAccountValidationSchema } from "utils/validations";
import {
  RootState,
  updateUserService,
  useAppDispatch,
  useAppSelector,
} from "store";
import {
  AlertBox,
  AppButton,
  CountryPickerModal,
  Header,
  ImagePickerModal,
  Text,
  TextInput,
} from "components";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import DatePicker from "react-native-date-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./edit-profile.styles";

const EditProfileScreen: FC<
  NativeStackScreenProps<NavigatorParamList, "editprofile">
> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [countryModalVisible, setCountryModalVisible] =
    useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [successModalVisible, setSuccessModalVisible] =
    useState<boolean>(false);
  const [profileImage, setProfileImage] =
    useState<ImageSourcePropType>(personPlaceholder);
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);

  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [open, setOpen] = useState<boolean>(false);

  const validationSchema = editAccountValidationSchema;
  const initialValues: UpdateUserI = {
    firstname: user?.firstname ?? "",
    lastname: user?.lastname ?? "",
  };

  const closeModal = () => setImageModalVisible((prev) => !prev);
  const handleImageBackdropPress = () => closeModal();

  const onCloseAlertBoxPress = () => {
    setSuccessModalVisible((prev) => !prev);
    navigation.goBack();
  };

  const uploadProfileImage = async () => setImageModalVisible((prev) => !prev);

  const submit = async ({ firstname, lastname }: UpdateUserI) => {
    setSuccessModalVisible((prev) => !prev);
    await dispatch(updateUserService({ firstname, lastname, dateOfBirth }));
  };

  const {
    handleChange,
    handleSubmit,
    setFieldTouched,
    errors,
    touched,
    values,
  } = useFormikHook(submit, validationSchema, initialValues);

  useEffect(() => {
    if (user?.dateOfBirth) {
      setDateOfBirth(new Date(user.dateOfBirth));
    } else {
      setDateOfBirth(new Date());
    }
  }, []);

  return (
    <View style={styles.container}>
      <Header
        headerText="Edit Profile"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imgContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <TouchableOpacity
            style={styles.changeImageBtn}
            onPress={uploadProfileImage}
          >
            <Ionicons name="camera" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <TextInput
            label="First Name"
            placeholder="Enter First Name"
            value={values.firstname}
            onBlur={() => setFieldTouched("firstname")}
            onChangeText={handleChange("firstname")}
            error={errors.firstname}
            visible={touched.firstname}
          />

          <TextInput
            label="Last Name"
            placeholder="Enter Last Name"
            value={values.lastname}
            onBlur={() => setFieldTouched("lastname")}
            onChangeText={handleChange("lastname")}
            error={errors.lastname}
            visible={touched.lastname}
          />

          <TextInput label="Email" value={`${user?.email}`} />

          <Text
            text="Date of Birth"
            preset="labelHeading"
            style={styles.topSpacing}
          />
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={styles.pickerInputField}
          >
            <Text
              text={dateOfBirth ? formatDateToDMY(dateOfBirth) : "Select Date"}
              preset={user?.dateOfBirth ? "inputText" : "inputTextPlaceholder"}
            />
          </TouchableOpacity>

          <Text
            text="Country / Region"
            preset="labelHeading"
            style={styles.topSpacing}
          />
          <TouchableOpacity
            onPress={() => setCountryModalVisible((prev) => !prev)}
            style={styles.pickerInputField}
          >
            <Text
              text={user?.country ? user?.country : "Select Country"}
              preset={user?.country ? "inputText" : "inputTextPlaceholder"}
            />
          </TouchableOpacity>
        </View>

        <AppButton
          preset="filled"
          text={"Save Changes"}
          onPress={handleSubmit}
        />
      </ScrollView>

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
        date={dateOfBirth ? dateOfBirth : new Date()}
        onConfirm={(date) => {
          setDateOfBirth(new Date(date));
          setOpen((prev) => !prev);
        }}
        onCancel={() => {
          setOpen((prev) => !prev);
        }}
      />
    </View>
  );
};

export { EditProfileScreen };
