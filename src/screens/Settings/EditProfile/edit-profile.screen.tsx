import { FC, useEffect, useRef, useState } from "react";
import { Dimensions, Image, ImageSourcePropType, ScrollView, TouchableOpacity, View } from "react-native";
import { colors } from "theme";
import { UpdateUserI } from "interfaces/user";
import { useFormikHook } from "hooks/UseFormikHook";
import { formatDateToDMY } from "utils/formatDateAndTime";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { editAccountValidationSchema } from "utils/validations";
import { RootState, updateUserService, useAppDispatch, useAppSelector } from "store";
import {
  AlertBox,
  AppButton,
  BottomSheet,
  BottomSheetRefProps,
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

const { height } = Dimensions.get("window");

const EditProfileScreen: FC<NativeStackScreenProps<NavigatorParamList, "editprofile">> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);

  const [countryModalVisible, setCountryModalVisible] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>(personPlaceholder);
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const validationSchema = editAccountValidationSchema;
  const initialValues: UpdateUserI = { firstname: user?.firstname ?? "", lastname: user?.lastname ?? "" };

  const closeModal = () => setImageModalVisible((prev) => !prev);
  const handleImageBackdropPress = () => closeModal();

  const onCloseAlertBoxPress = () => {
    setSuccessModalVisible((prev) => !prev);
    navigation.goBack();
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.scrollTo(-height / 1);
    console.log(bottomSheetRef.current?.scrollTo(-height));
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.scrollTo(0);
  };

  const uploadProfileImage = async () => {
    // setImageModalVisible((prev) => !prev)
    openBottomSheet();
  };

  const submit = async ({ firstname, lastname }: UpdateUserI) => {
    await dispatch(updateUserService({ firstname, lastname, country: selectedCountry, dateOfBirth: date }));
    setSuccessModalVisible((prev) => !prev);
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  useEffect(() => {
    if (user?.dateOfBirth) {
      const dateOfBirth = new Date(user.dateOfBirth);
      setDate(dateOfBirth);
    } else {
      setDate(null);
    }
    setSelectedCountry(user?.country ?? "");
  }, [user]);

  return (
    <View style={styles.container}>
      <Header headerText="Edit Profile" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

      <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
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

          <Text text="Date of Birth" preset="labelHeading" style={styles.topSpacing} />
          <TouchableOpacity onPress={() => setOpen(true)} style={styles.pickerInputField}>
            <Text
              text={date ? formatDateToDMY(date) : user?.dateOfBirth ? user?.dateOfBirth : "Select Date"}
              preset={date || user?.dateOfBirth ? "inputText" : "inputTextPlaceholder"}
            />
          </TouchableOpacity>

          <Text text="Country / Region" preset="labelHeading" style={styles.topSpacing} />
          <TouchableOpacity onPress={() => setCountryModalVisible((prev) => !prev)} style={styles.pickerInputField}>
            <Text
              text={selectedCountry ? selectedCountry : user?.country ? user?.country : "Select Country"}
              preset={selectedCountry || user?.country ? "inputText" : "inputTextPlaceholder"}
            />
          </TouchableOpacity>
        </View>

        <AppButton preset="filled" text={"Save Changes"} onPress={handleSubmit} />
      </ScrollView>

      {/* <BottomSheet
        ref={bottomSheetRef}
        height={height / 2}
        closeBottomSheet={closeBottomSheet}
        onClose={closeBottomSheet}
      >
        <View>
          <Text text={"Select Image"} preset="heading" style={styles.heading} />

          <View style={styles.body}>
            <View style={styles.btnParentSection}>
              <TouchableOpacity onPress={() => {}} style={styles.btnSection}>
                <Ionicons name="camera" size={35} color={colors.primary} />
                <Text text="Open Camera" preset="subheading" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}} style={styles.btnSection}>
                <Ionicons name="image" size={35} color={colors.primary} />
                <Text text="Open Gallery" preset="subheading" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet> */}

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
        date={date ? date : new Date()}
        // textColor={colors.primary}
        // theme="dark"
        onConfirm={(date) => {
          setOpen((prev) => !prev);
          setDate(date);
        }}
        onCancel={() => {
          setOpen((prev) => !prev);
        }}
      />
    </View>
  );
};

export { EditProfileScreen };
