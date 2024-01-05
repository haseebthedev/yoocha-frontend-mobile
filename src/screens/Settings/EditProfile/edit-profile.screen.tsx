import { FC, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { AlertBox, Button, CountryPickerModal, Header, ImagePickerModal, Text, TextInput } from "components";
import { colors } from "theme";
import { MY_PROFILE_DATA } from "constant";
import { NavigatorParamList } from "navigators";
import { formatDateToDMY } from "utils/formatDateAndTime";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import DatePicker from "react-native-date-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./edit-profile.styles";

const EditProfileScreen: FC<NativeStackScreenProps<NavigatorParamList, "editprofile">> = ({ navigation, route }) => {
  const [countryModalVisible, setCountryModalVisible] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("Pakistan");
  const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<any>({ uri: MY_PROFILE_DATA.profilePic });
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);

  const closeModal = () => {
    setImageModalVisible((prev) => !prev);
  };

  const handleBackdropPress = () => {
    closeModal();
  };
  const onCloseAlertBoxPress = () => {
    setSuccessModalVisible((prev) => !prev);
  };

  const onPressSaveHandler = () => {
    console.log("country name is === ", selectedCountry);
    setSuccessModalVisible((prev) => !prev);
  };

  const uploadProfileImage = async () => {
    setImageModalVisible((prev) => !prev);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header headerText="Edit Profile" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

      <View style={styles.mainContainer}>
        <View style={{ alignSelf: "center" }}>
          <Image source={profileImage} style={styles.profileImage} />
          <TouchableOpacity style={styles.changeImageBtn} onPress={uploadProfileImage}>
            <Ionicons name="camera" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <TextInput label="Name" value={MY_PROFILE_DATA.firstname + " " + MY_PROFILE_DATA.lastname} />

          <TextInput label="Email" value={MY_PROFILE_DATA.email} />

          <Text text="Date of Birth" preset="labelHeading" style={styles.topSpacing} />
          <TouchableOpacity onPress={() => setOpen(true)} style={styles.pickerInputField}>
            <Text text={date ? formatDateToDMY(date) : "Select Date"} preset="default" />
          </TouchableOpacity>

          <Text text="Country / Region" preset="labelHeading" style={styles.topSpacing} />
          <TouchableOpacity onPress={() => setCountryModalVisible((prev) => !prev)} style={styles.pickerInputField}>
            <Text text={selectedCountry} preset="default" />
          </TouchableOpacity>

          <Button title={"save"} onPress={onPressSaveHandler} />
        </View>
      </View>

      {countryModalVisible && (
        <CountryPickerModal
          visible={countryModalVisible}
          setSelectedCountry={setSelectedCountry}
          setCountryModalVisible={setCountryModalVisible}
        />
      )}

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
        onBackdropPress={handleBackdropPress}
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
