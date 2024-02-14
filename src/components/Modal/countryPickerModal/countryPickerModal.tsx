import React, { useState } from "react";
import { View } from "react-native";
import { wp } from "utils/responsive";
import { colors, typography } from "theme";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";

interface CountryPickerModalI {
  visible: boolean;
  setSelectedCountry: (name: string) => void;
  setCountryModalVisible: (any) => void;
}

const CountryPickerModal: React.FC<CountryPickerModalI> = ({ visible, setSelectedCountry, setCountryModalVisible }) => {
  const [countryCode, setCountryCode] = useState<CountryCode>("FR");
  const [country, setCountry] = useState<any>(null);

  const onSelect = (country: any) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setSelectedCountry(country.name);
    setCountryModalVisible((prev: boolean) => !prev);
  };
  return (
    <>
      {visible && (
        <View style={{ paddingHorizontal: 20 }}>
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
            theme={{
              backgroundColor: colors.white,
              fontFamily: typography.regular,
              activeOpacity: 1,
              flagSize: 22,
              filterPlaceholderTextColor: colors.darkGrey,
            }}
          />
        </View>
      )}
    </>
  );
};

export { CountryPickerModal };
