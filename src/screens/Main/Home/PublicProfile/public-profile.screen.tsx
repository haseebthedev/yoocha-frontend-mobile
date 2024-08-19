import { FC, useCallback, useEffect, useState } from "react";
import { Image, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import { colors } from "theme";
import { ScreenEnum } from "enums";
import { useAppTheme } from "hooks";
import { NavigatorParamList } from "navigators";
import { AddFriendButton, AlertBox, Header, Text } from "components";
import { RootState, UserI, removeFriendRequest, sendFriendRequest, useAppDispatch, useAppSelector } from "store";
import personPlaceholder from "assets/images/person.png";

import createStyles from "./public-profile.styles";

const PublicProfileScreen: FC<NativeStackScreenProps<NavigatorParamList, ScreenEnum.PUBLIC_PROFILE>> = ({
  navigation,
  route,
}) => {
  const { item }: { item: UserI } = route.params;

  const dispatch = useAppDispatch();
  const { loading, searchExplorePeople, friendSuggestions, explorePeople } = useAppSelector(
    (state: RootState) => state.contacts
  );

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const [personId, setPersonId] = useState<string>("");
  const [publicProfile, setPublicProfile] = useState<UserI>();
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);

  const onBtnPress = useCallback(
    async (id: string, isFriendReqSent: boolean = false) => {
      if (isFriendReqSent) {
        setAlertModalVisible((prev: boolean) => !prev);
        setPersonId(id);
        return;
      }

      try {
        await dispatch(sendFriendRequest({ inviteeId: id })).unwrap();
      } catch (err) {
        console.error("Error sending friend request:", err);
      }
    },
    [dispatch]
  );

  const cancelFriendRequest = useCallback(async () => {
    try {
      await dispatch(removeFriendRequest({ inviteeId: personId })).unwrap();
    } catch (err) {
      console.error("Error cancelling friend request:", err);
    } finally {
      setAlertModalVisible((prev: boolean) => !prev);
    }
  }, [dispatch, personId]);

  useEffect(() => {
    const filteredExplorePeople = explorePeople?.docs?.find((user) => user._id === item._id);
    const filteredFriendSuggestions = friendSuggestions?.docs?.find((user) => user._id === item._id);
    const filteredSearchExplorePeople = searchExplorePeople?.docs?.find((user) => user._id === item._id);

    if (filteredExplorePeople) {
      setPublicProfile(filteredExplorePeople);
    } else if (filteredFriendSuggestions) {
      setPublicProfile(filteredFriendSuggestions);
    } else if (filteredSearchExplorePeople) {
      setPublicProfile({ ...filteredSearchExplorePeople });
    }
  }, [explorePeople, searchExplorePeople, friendSuggestions, item._id]);

  return (
    <View style={styles.publicProfileContainer}>
      <View style={styles.staticHeaderContainer}>
        <Header
          headerText={"YOOCHAT"}
          leftIcon="chevron-back"
          onLeftPress={() => navigation.goBack()}
          iconStyle={colors.white}
          titleStyle={styles.headerStyle}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.roundedContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                source={item?.profilePicture ? { uri: item?.profilePicture } : personPlaceholder}
                style={item?.profilePicture ? styles.profilePic : styles.imagePlaceholder}
              />
            </View>
            <Text text={`${item.firstname} ${item.lastname}`} preset="largeHeading" style={styles.name} />

            <View style={styles.location}>
              {item?.country && (
                <>
                  <Ionicons name="location-sharp" size={18} color={colors.textDark} />
                  <Text text={item?.country} preset="light" />
                </>
              )}
            </View>

            <View style={styles.addFriendBtnContainer}>
              <AddFriendButton
                title={publicProfile?.isFriendReqSent ? "Pending" : "Add Friend"}
                onPress={() => onBtnPress(item?._id, publicProfile?.isFriendReqSent)}
              />
            </View>
          </View>
        </View>
      </View>

      <AlertBox
        open={alertModalVisible}
        title="Cancel Request"
        description="Are you sure you want to cancel request?"
        onClose={() => setAlertModalVisible((prev) => !prev)}
        secondaryButtonText="Cancel"
        primaryButtonText="Remove"
        secondaryOnClick={() => setAlertModalVisible((prev) => !prev)}
        primaryOnClick={cancelFriendRequest}
      />
    </View>
  );
};

export { PublicProfileScreen };
