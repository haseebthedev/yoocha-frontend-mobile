import React, { useState } from "react";
import { wp } from "utils/responsive";
import CountryPicker from "react-native-country-picker-modal";

interface CountryPickerModalI {
  visible?: boolean;
  setSelectedCountry: (name: string) => void;
  setCountryModalVisible: (any) => void;
}

const CountryPickerModal: React.FC<CountryPickerModalI> = ({ visible, setSelectedCountry, setCountryModalVisible }) => {
  const [countryCode, setCountryCode] = useState<any>("FR");
  const [country, setCountry] = useState<any>(null);
  const [withCountryNameButton, setWithCountryNameButton] = useState<boolean>(false);
  const [withFlag, setWithFlag] = useState<boolean>(true);
  const [withEmoji, setWithEmoji] = useState<boolean>(true);
  const [withFilter, setWithFilter] = useState<boolean>(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState<boolean>(false);
  const [withCallingCode, setWithCallingCode] = useState<boolean>(false);

  const onSelect = (country: any) => {
    let name = country.name;
    setCountryCode(country.cca2);
    setCountry(country);
    setSelectedCountry(name);
    setCountryModalVisible((prev) => !prev);
  };
  return (
    <>
      <CountryPicker
        {...{
          countryCode,
          withFilter,
          withFlag,
          withCountryNameButton,
          withAlphaFilter,
          withCallingCode,
          withEmoji,
          onSelect,
        }}
        visible={visible}
        containerButtonStyle={{ marginBottom: wp(5) }}
      />
    </>
  );
};

export { CountryPickerModal };
