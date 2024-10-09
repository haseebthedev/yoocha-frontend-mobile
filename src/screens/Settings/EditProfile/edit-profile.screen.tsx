import { FC, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Image, ImageSourcePropType, ScrollView, TouchableOpacity, View, Keyboard } from "react-native";

import { NavigatorParamList } from "navigators";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TranslationLanguageCodeMap } from "react-native-country-picker-modal";
import { editAccountValidationSchema } from "utils/validations";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import DatePicker from "react-native-date-picker";

import { colors } from "theme";
import { ScreenEnum } from "enums";
import { formatDateToDMY } from "utils/dateAndTime";
import { uploadImageToCloudinary } from "utils/cloudinary";
import { UpdateUserI, UserUpdateI } from "interfaces";
import { useAppTheme, useFormikHook } from "hooks";
import { RootState, updateUserService, useAppDispatch, useAppSelector } from "store";
import { AlertBox, CountryPickerModal, Header, ImagePickerModal, LoadingIndicator, Text, TextInput } from "components";
import personPlaceholder from "assets/images/person.png";

import createStyles from "./edit-profile.styles";

const EditProfileScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.EDIT_PROFILE>> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state: RootState) => state.auth);

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints: string[] = useMemo(() => ["25%", "50%", "75%"], []);

  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>(personPlaceholder);
  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType>();
  const [selectedCountry, setSelectedCountry] = useState<TranslationLanguageCodeMap | string>("");
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const [imagePickerVisible, setImagePickerVisible] = useState<boolean>(false);
  const [countryModalVisible, setCountryModalVisible] = useState<boolean>(false);
  const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);

  const validationSchema = editAccountValidationSchema;
  const initialValues: UpdateUserI = {
    firstname: user?.firstname ?? "",
    lastname: user?.lastname ?? "",
    email: user?.email ?? "",
  };

  const handleOpenPress = () => {
    Keyboard.dismiss();
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
    try {
      let profilePicture = null;
      if (selectedImage) {
        profilePicture = await uploadImageToCloudinary(selectedImage);
      }

      const dataToBeUpdate: UserUpdateI = {
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email,
        country: selectedCountry,
        dateOfBirth,
      };

      if (profilePicture) {
        dataToBeUpdate.profilePicture = profilePicture;
      }

      await dispatch(updateUserService(dataToBeUpdate)).unwrap();

      setSuccessModalVisible((prev) => !prev);
    } catch (error) {
      console.error("Error while updating profile: ", error);
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
      <Header
        headerText="Edit Profile"
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
        titleStyle={{ color: theme.colors.heading }}
        customComponentRight={
          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.5}
            onPress={() => {
              handleSubmit();
            }}
          >
            {loading ? <LoadingIndicator /> : <Text preset="heading" text={"Save"} style={styles.btnText} />}
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.imgContainer}>
          <View style={styles.profileImageContainer}>
            <Image
              source={profileImage}
              style={user?.profilePicture || selectedImage ? styles.profileImage : styles.imagePlaceholder}
              resizeMode="cover"
            />
          </View>
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
            style={{ color: theme.colors.heading }}
          />

          <TextInput
            label="Last Name"
            placeholder="Enter Last Name"
            value={values.lastname}
            onBlur={() => setFieldTouched("lastname")}
            onChangeText={handleChange("lastname")}
            error={errors.lastname}
            visible={touched.lastname}
            style={{ color: theme.colors.heading }}
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
            style={{ color: theme.colors.heading }}
          />

          <Text
            text="Date of Birth"
            preset="labelHeading"
            style={[styles.topSpacing, { color: theme.colors.heading }]}
          />
          <TouchableOpacity onPress={() => setDateModalVisible(true)} style={styles.pickerInputField}>
            <Text
              text={dateOfBirth ? formatDateToDMY(dateOfBirth) : "Select Date"}
              preset={dateOfBirth ? "inputText" : "inputTextPlaceholder"}
              style={{ color: theme.colors.heading }}
            />
          </TouchableOpacity>

          <Text
            text="Country / Region"
            preset="labelHeading"
            style={[styles.topSpacing, { color: theme.colors.heading }]}
          />
          <TouchableOpacity onPress={() => setCountryModalVisible((prev) => !prev)} style={styles.pickerInputField}>
            <Text
              text={selectedCountry ? String(selectedCountry) : "Select Country"}
              preset={selectedCountry ? "inputText" : "inputTextPlaceholder"}
              style={{ color: theme.colors.heading }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ImagePickerModal
        isVisible={imagePickerVisible}
        title="Select an option!"
        setProfileImage={setProfileImage}
        setSelectedImage={setSelectedImage}
        bottomSheetRef={bottomSheetRef}
        snapPoints={snapPoints}
        renderBackdrop={renderBackdrop}
        setAttachmentPickerVisible={setImagePickerVisible}
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
        minimumDate={new Date(1990, 0, 1)}
        maximumDate={new Date(2010, 11, 31)}
      />
    </GestureHandlerRootView>
  );
};

export { EditProfileScreen };
