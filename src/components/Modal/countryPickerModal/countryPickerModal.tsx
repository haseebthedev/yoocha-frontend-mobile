import React, { useState } from "react";
import { wp } from "utils/responsive";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";

interface CountryPickerModalI {
  visible: boolean;
  setSelectedCountry: (name: string) => void;
  setCountryModalVisible: (any) => void;
}

const CountryPickerModal: React.FC<CountryPickerModalI> = ({ visible, setSelectedCountry, setCountryModalVisible }) => {
  const [countryCode, setCountryCode] = useState<CountryCode>("FR");
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
    setCountryModalVisible((prev: boolean) => !prev);
  };
  return (
    <>
      {visible && (
        <CountryPicker
          countryCode={countryCode}
          withFilter={true}
          withFlag={true}
          withCountryNameButton={false}
          withAlphaFilter={false}
          withCallingCode={false}
          withEmoji={true}
          onSelect={onSelect}
          visible={visible}
          containerButtonStyle={{ marginBottom: wp(5) }}
          onClose={() => setCountryModalVisible(false)}
        />
      )}
    </>
  );
};

export { CountryPickerModal };
