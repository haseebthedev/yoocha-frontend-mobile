import { FC, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Image, ImageSourcePropType, ScrollView, TouchableOpacity, View, ActivityIndicator } from "react-native";

import { NavigatorParamList } from "navigators";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TranslationLanguageCodeMap } from "react-native-country-picker-modal";
import { editAccountValidationSchema } from "utils/validations";
import Ionicons from "react-native-vector-icons/Ionicons";
import DatePicker from "react-native-date-picker";

import { colors } from "theme";
import { useFormikHook } from "hooks/UseFormikHook";
import { formatDateToDMY } from "utils/dateAndTime";
import { uploadImageToCloudinary } from "../../../cloudinary/uploadImage";
import { UpdateUserI, UserUpdateI } from "interfaces/user";
import { RootState, updateUserService, useAppDispatch, useAppSelector } from "store";
import { AlertBox, AppButton, CountryPickerModal, Header, ImagePickerModal, Text, TextInput } from "components";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import styles from "./edit-profile.styles";

const EditProfileScreen: FC<NativeStackScreenProps<NavigatorParamList, "editprofile">> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints: string[] = useMemo(() => ["25%", "50%", "75%"], []);

  const [countryModalVisible, setCountryModalVisible] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<TranslationLanguageCodeMap | string>("");
  const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>(personPlaceholder);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const [imagePickerVisible, setImagePickerVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = editAccountValidationSchema;
  const initialValues: UpdateUserI = {
    firstname: user?.firstname ?? "",
    lastname: user?.lastname ?? "",
    email: user?.email ?? "",
  };

  const handleOpenPress = () => {
    setImagePickerVisible(true);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  const onCloseAlertBoxPress = () => {
    setSuccessModalVisible((prev) => !prev);
    navigation.goBack();
  };

  const submit = async ({ firstname, lastname, email }: UpdateUserI) => {
    let profilePicture = null;

    try {
      setLoading(true);
      if (selectedImage) {
        profilePicture = await uploadImageToCloudinary(selectedImage);
      }

      const dataToBeUpdate: UserUpdateI = { firstname, lastname, email, country: selectedCountry, dateOfBirth };

      if (profilePicture) {
        dataToBeUpdate.profilePicture = profilePicture;
      }

      await dispatch(updateUserService(dataToBeUpdate))
        .unwrap()
        .then(() => setLoading(false));

      setSuccessModalVisible((prev) => !prev);
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  useEffect(() => {
    if (user?.dateOfBirth) {
      setDateOfBirth(new Date(user.dateOfBirth));
    }
  }, []);

  useEffect(() => {
    if (user?.country) {
      setSelectedCountry(user?.country);
    }
    // else {
    //   setSelectedCountry("Select Country");
    // }
  }, [user]);

  useEffect(() => {
    if (user?.profilePicture) {
      setProfileImage({ uri: user.profilePicture });
    } else {
      setProfileImage(personPlaceholder);
    }
  }, [user]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Header headerText="Edit Profile" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

      <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.imgContainer}>
          <Image source={profileImage} style={styles.profileImage} />
          <TouchableOpacity style={styles.changeImageBtn} onPress={handleOpenPress}>
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

          <TextInput
            label="Email"
            placeholder="Enter Email"
            value={values.email}
            onBlur={() => setFieldTouched("email")}
            onChangeText={handleChange("email")}
            error={errors.email}
            visible={touched.email}
          />

          <Text text="Date of Birth" preset="labelHeading" style={styles.topSpacing} />
          <TouchableOpacity onPress={() => setDateModalVisible(true)} style={styles.pickerInputField}>
            <Text
              text={dateOfBirth ? formatDateToDMY(dateOfBirth) : "Select Date"}
              preset={dateOfBirth ? "inputText" : "inputTextPlaceholder"}
            />
          </TouchableOpacity>

          <Text text="Country / Region" preset="labelHeading" style={styles.topSpacing} />
          <TouchableOpacity onPress={() => setCountryModalVisible((prev) => !prev)} style={styles.pickerInputField}>
            <Text
              text={selectedCountry ? String(selectedCountry) : "Select Country"}
              preset={selectedCountry ? "inputText" : "inputTextPlaceholder"}
            />
          </TouchableOpacity>
        </View>

        <AppButton
          preset="filled"
          text={loading ? "" : "Save Changes"}
          onPress={handleSubmit}
          disabled={loading}
          RightAccessory={() => loading && <ActivityIndicator color="white" />}
        />
      </ScrollView>

      <ImagePickerModal
        isVisible={imagePickerVisible}
        title="Select an option!"
        setProfileImage={setProfileImage}
        setSelectedImage={setSelectedImage}
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        renderBackdrop={renderBackdrop}
      />

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

      <DatePicker
        title={"Select Date"}
        mode="date"
        modal
        open={dateModalVisible}
        date={dateOfBirth ? dateOfBirth : new Date()}
        onConfirm={(date) => {
          setDateOfBirth(new Date(date));
          setDateModalVisible((prev) => !prev);
        }}
        onCancel={() => setDateModalVisible((prev) => !prev)}
      />
    </GestureHandlerRootView>
  );
};

export { EditProfileScreen };
