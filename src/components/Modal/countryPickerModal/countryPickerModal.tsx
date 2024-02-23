import React, { useState } from "react";
import CountryPicker, { Country, CountryCode, TranslationLanguageCodeMap } from "react-native-country-picker-modal";

interface CountryPickerModalI {
  visible: boolean;
  setSelectedCountry: (name: string | TranslationLanguageCodeMap) => void;
  setCountryModalVisible: (value: boolean) => void;
}

const CountryPickerModal: React.FC<CountryPickerModalI> = ({ visible, setSelectedCountry, setCountryModalVisible }) => {
  const [countryCode, setCountryCode] = useState<CountryCode>("FR");
  const [country, setCountry] = useState<Country | null>(null);

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setSelectedCountry(country.name);
    setCountryModalVisible(false);
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
