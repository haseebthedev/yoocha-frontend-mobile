import React, { useState } from "react";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";

interface CountryPickerModalI {
  visible: boolean;
  setSelectedCountry: (name: string) => void;
  setCountryModalVisible: (any) => void;
}

const CountryPickerModal: React.FC<CountryPickerModalI> = ({
  visible,
  setSelectedCountry,
  setCountryModalVisible,
}) => {
  const [countryCode, setCountryCode] = useState<CountryCode>("FR");
  const [country, setCountry] = useState<any>(null);
  const [withCountryNameButton, setWithCountryNameButton] =
    useState<boolean>(false);
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
          onSelect={onSelect}
          visible={visible}
          withEmoji={false}
          onClose={() => setCountryModalVisible(false)}
          theme={{
            fontSize: 16,
            fontFamily: "Poppins-Regular",
            activeOpacity: 1,
            flagSize: 20,
          }}
        />
      )}
    </>
  );
};

export { CountryPickerModal };
