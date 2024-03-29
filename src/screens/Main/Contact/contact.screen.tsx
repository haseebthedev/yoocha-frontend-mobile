import { FC, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native";
import { colors } from "theme";
import { socket } from "socket";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EventEnum, EventEnumRole } from "enums";
import { MenuOptionI, SendFriendReqPayloadI } from "interfaces";
import { CONTACTS_DATA, contactScreenOptions } from "constant";
import { AlertBox, AppHeading, ContactUserCard, EmptyListText, PopupMenu, Text, UserSuggestionCard } from "components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  GetFriendsSuggestionResponseI,
  RootState,
  UserI,
  getFriendsSuggestionService,
  useAppDispatch,
  useAppSelector,
} from "store";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./contact.styles";

const ContactScreen: FC<NativeStackScreenProps<NavigatorParamList, "contacts">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [suggestedFriends, setSuggestedFriends] = useState<UserI[]>([]);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuOption, setMenuOption] = useState<MenuOptionI>({
    id: 0,
    title: "",
  });
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onAddFriendBtnPress = async (id: string) => {
    const payload: SendFriendReqPayloadI = {
      participants: [
        { user: user?._id ?? "", role: EventEnumRole.INITIATOR },
        { user: id, role: EventEnumRole.INVITEE },
      ],
    };
    if (socket) {
      socket.emit(EventEnum.SEND_FRIEND_REQUEST, payload);
    }

    const filteredSuggestedFriends = suggestedFriends.filter((user) => user._id != id);
    setSuggestedFriends(filteredSuggestedFriends);
  };

  const getFriendsSuggestions = async () => {
    setIsLoading(true);
    await dispatch(getFriendsSuggestionService())
      .unwrap()
      .then((response: GetFriendsSuggestionResponseI) => {
        if (response?.result?.users) {
          setSuggestedFriends(response?.result?.users);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getFriendsSuggestions();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.appHeader}>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" color={colors.textDark} size={24} />
        </TouchableOpacity>
        <Text text="YOOCHAT" preset="logo" />
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="ellipsis-vertical-sharp" color={colors.textDark} size={20} />
        </TouchableOpacity>

        <PopupMenu
          isVisible={menuVisible}
          setMenuVisible={setMenuVisible}
          menuOptions={contactScreenOptions}
          setMenuOption={setMenuOption}
        />
      </View>

      <View style={styles.suggestionsContainer}>
        <AppHeading
          title="People may know"
          rightTitle="View All"
          onRightPress={() => navigation.navigate("suggestions")}
        />
        <>
          {isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : (
            <FlatList
              horizontal
              data={suggestedFriends}
              keyExtractor={(item: UserI, index: number) => item?._id || index.toString()}
              contentContainerStyle={styles.suggestionListContainer}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }: { item: UserI }) => (
                <UserSuggestionCard
                  item={item}
                  onViewPress={() => navigation.navigate("publicProfile", { item })}
                  onAddFriendBtnPress={() => onAddFriendBtnPress(item._id)}
                />
              )}
              ListEmptyComponent={() =>
                !isLoading && suggestedFriends.length === 0 && <EmptyListText text="No Suggestions!" />
              }
            />
          )}
        </>
      </View>

      <View style={styles.exploreContainer}>
        <AppHeading title="Explore" />

        <FlatList
          data={CONTACTS_DATA}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ContactUserCard item={item} btnTitle="Add" onAddBtnPress={() => console.log("join room")} />
          )}
        />
      </View>

      <AlertBox
        open={alertModalVisible}
        title="Cancel Request!"
        description="Are you sure you want to cancel request?"
        onClose={() => setAlertModalVisible((prev) => !prev)}
        secondaryButtonText="Cancel"
        primaryButtonText="Remove"
        secondaryOnClick={() => setAlertModalVisible((prev) => !prev)}
      />
    </View>
  );
};

export { ContactScreen };
