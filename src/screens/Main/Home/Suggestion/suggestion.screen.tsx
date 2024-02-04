import { FC } from "react";
import { FlatList, View } from "react-native";
import { AddUserSuggestionCard, Header, SearchBar } from "components";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { hp } from "utils/responsive";
import { HOME_SUGGESTION_DATA } from "constant";
import styles from "./suggestion.styles";

const SuggestionsScreen: FC<NativeStackScreenProps<NavigatorParamList, "suggestions">> = ({ navigation }) => {
  const onViewPress = (item) => navigation.navigate("publicProfile", { item });

  return (
    <View style={styles.container}>
      <Header headerText="Suggestions" leftIcon="chevron-back" onLeftPress={() => navigation.goBack()} />

      <View style={{ flex: 1 }}>
        <SearchBar />

        <FlatList
          data={HOME_SUGGESTION_DATA}
          keyExtractor={(item) => item.id}
          style={{ marginTop: hp(2) }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <AddUserSuggestionCard item={item} onViewPress={() => onViewPress(item)} onAddPress={() => {}} />
          )}
        />
      </View>
    </View>
  );
};

export { SuggestionsScreen };
