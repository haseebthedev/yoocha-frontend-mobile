import { FC, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Image, ImageSourcePropType, ScrollView, TouchableOpacity, View } from "react-native";
import { colors } from "theme";
import { UpdateUserI } from "interfaces/user";
import { useFormikHook } from "hooks/UseFormikHook";
import { formatDateToDMY } from "utils/dateAndTime";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TranslationLanguageCodeMap } from "react-native-country-picker-modal";
import { editAccountValidationSchema } from "utils/validations";
import { RootState, updateUserService, useAppDispatch, useAppSelector } from "store";
import { AlertBox, AppButton, CountryPickerModal, Header, ImagePickerModal, Text, TextInput } from "components";
import BottomSheet, { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import DatePicker from "react-native-date-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
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
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);

  const validationSchema = editAccountValidationSchema;
  const initialValues: UpdateUserI = {
    firstname: user?.firstname ?? "",
    lastname: user?.lastname ?? "",
  };

  const handleOpenPress = () => bottomSheetRef.current?.snapToIndex(0);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  const onCloseAlertBoxPress = () => {
    setSuccessModalVisible((prev) => !prev);
    navigation.goBack();
  };

  const submit = async ({ firstname, lastname }: UpdateUserI) => {
    await dispatch(updateUserService({ firstname, lastname, country: selectedCountry, dateOfBirth }));
    setSuccessModalVisible((prev) => !prev);
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  useEffect(() => {
    if (user?.dateOfBirth) {
      setDateOfBirth(new Date(user.dateOfBirth));
    } else {
      setDateOfBirth(new Date());
    }
  }, []);

  useEffect(() => {
    if (user?.country) {
      setSelectedCountry(user?.country);
    } else {
      setSelectedCountry("Select Country");
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

          <TextInput label="Email" value={`${user?.email}`} />

          <Text text="Date of Birth" preset="labelHeading" style={styles.topSpacing} />
          <TouchableOpacity onPress={() => setDateModalVisible(true)} style={styles.pickerInputField}>
            <Text
              text={dateOfBirth ? formatDateToDMY(dateOfBirth) : "Select Date"}
              preset={user?.dateOfBirth ? "inputText" : "inputTextPlaceholder"}
            />
          </TouchableOpacity>

          <Text text="Country / Region" preset="labelHeading" style={styles.topSpacing} />
          <TouchableOpacity onPress={() => setCountryModalVisible((prev) => !prev)} style={styles.pickerInputField}>
            <Text
              text={String(selectedCountry)}
              preset={selectedCountry === "Select Country" ? "inputTextPlaceholder" : "inputText"}
            />
          </TouchableOpacity>
        </View>

        <AppButton preset="filled" text={"Save Changes"} onPress={handleSubmit} />
      </ScrollView>

      <ImagePickerModal
        title="Select an option!"
        setProfileImage={setProfileImage}
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
