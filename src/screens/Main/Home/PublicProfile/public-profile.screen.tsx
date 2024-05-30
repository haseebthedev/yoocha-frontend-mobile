import { FC, useState } from "react";
import { Image, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import { colors } from "theme";
import { useAppTheme } from "hooks";
import { NavigatorParamList } from "navigators";
import { AddFriendButton, AlertBox, Header, Text } from "components";
import { UserI, removeFriendRequest, sendFriendRequest, useAppDispatch } from "store";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import createStyles from "./public-profile.styles";

const PublicProfileScreen: FC<NativeStackScreenProps<NavigatorParamList, "publicProfile">> = ({
  navigation,
  route,
}) => {
  const dispatch = useAppDispatch();

  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  const { item }: { item: UserI } = route.params;
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);

  // const [viewStatus, setViewStatus] = useState<boolean>(false);
  // const [activeTab, setActiveTab] = useState<string>("Photos");
  // const [statusData, setStatusData] = useState<UserStatusI>({
  //   id: "",
  //   name: "",
  //   profilePic: "",
  //   date: "",
  //   statusImage: "",
  // });

  // const onViewPress = (selectedItem) => {
  //   setStatusData({
  //     id: selectedItem.id,
  //     statusImage: selectedItem.media,
  //     name: "My Post",
  //     date: selectedItem.date,
  //     profilePic: selectedItem.profilePic,
  //   });
  //   setViewStatus((prev) => !prev);
  // };

  const [personId, setPersonId] = useState<string>("");

  const onBtnPress = async (id: string, isFriendReqSent: boolean = false) => {
    if (isFriendReqSent) {
      setAlertModalVisible((prev: boolean) => !prev);
      setPersonId(id);
    } else {
      await dispatch(sendFriendRequest({ inviteeId: id }))
        .unwrap()
        .catch((err) => console.error("error: ", err));
    }
  };

  const cancelFriendRequest = async () => {
    await dispatch(removeFriendRequest({ inviteeId: personId }))
      .unwrap()
      .catch((err) => console.error("error: ", err))
      .finally(() => setAlertModalVisible((prev: boolean) => !prev));
  };

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
            <Image
              source={item?.profilePicture ? { uri: item?.profilePicture } : personPlaceholder}
              style={styles.profilePic}
            />
            <Text text={`${item.firstname} ${item.lastname}`} preset="largeHeading" style={styles.name} />

            <View style={styles.location}>
              {item?.country && (
                <>
                  <Ionicons name="location-sharp" size={18} color={colors.textDark} />
                  <Text text={item?.country} preset="light" />
                </>
              )}
            </View>

            {/* <View style={styles.infoContainer}>
                <View style={styles.infoHeading}>
                  <Text text={String(0)} style={styles.info} />
                  <Text text="Posts" style={styles.infoText} />
                </View>
                <View style={styles.infoHeading}>
                  <Text text={String(0)} style={styles.info} />
                  <Text text="Friends" style={styles.infoText} />
                </View>
                <View style={styles.infoHeading}>
                  <Text text={String(0)} style={styles.info} />
                  <Text text="Likes" style={styles.infoText} />
                </View>
              </View> */}

            <View style={styles.addFriendBtnContainer}>
              <AddFriendButton
                title={item?.isFriendReqSent ? "Pending" : "Add Friend"}
                onPress={() => onBtnPress(item?._id, item?.isFriendReqSent)}
              />
            </View>
          </View>

          {/* <View>
                <View style={styles.tabNav}>
                  <TouchableOpacity onPress={() => setActiveTab("Photos")}>
                    <Text
                      text="Photos"
                      style={[styles.tabNavText, activeTab === "Photos" && { color: colors.primary }]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setActiveTab("Likes")}>
                    <Text
                      text="Likes"
                      style={[styles.tabNavText, activeTab === "Likes" && { color: colors.primary }]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.divider} />
              </View> */}
        </View>
      </View>

      {/* <FlatList
        data={MY_PROFILE_DATA.myPosts}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.containerStyle}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.container}>
            <View style={styles.mainContainer}>
              <View style={styles.roundedContainer}>
                <Image
                  source={item?.profilePicture ? { uri: item?.profilePicture } : personPlaceholder}
                  style={styles.profilePic}
                />
                <Text text={`${item.firstname} ${item.lastname}`} preset="largeHeading" style={styles.name} />

                <View style={styles.location}>
                  <Ionicons name="location-sharp" size={18} color={colors.textDark} />
                  <Text text={item.country ? item?.country : `Unknown`} preset="light" />
                </View>

                {/* <View style={styles.infoContainer}>
                <View style={styles.infoHeading}>
                  <Text text={String(0)} style={styles.info} />
                  <Text text="Posts" style={styles.infoText} />
                </View>
                <View style={styles.infoHeading}>
                  <Text text={String(0)} style={styles.info} />
                  <Text text="Friends" style={styles.infoText} />
                </View>
                <View style={styles.infoHeading}>
                  <Text text={String(0)} style={styles.info} />
                  <Text text="Likes" style={styles.infoText} />
                </View>
              </View> 

                <View style={styles.addFriendBtnContainer}>
                  <AddFriendButton title={isRequestSent ? "Pending" : "Add Friend"} onPress={onAddFriendBtnPress} />
                </View>
              </View>

              {/* <View>
                <View style={styles.tabNav}>
                  <TouchableOpacity onPress={() => setActiveTab("Photos")}>
                    <Text
                      text="Photos"
                      style={[styles.tabNavText, activeTab === "Photos" && { color: colors.primary }]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setActiveTab("Likes")}>
                    <Text
                      text="Likes"
                      style={[styles.tabNavText, activeTab === "Likes" && { color: colors.primary }]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.divider} />
              </View> 
            </View>
          </View>
        )}
        renderItem={({ item }) => (
          // <TouchableOpacity onPress={() => onViewPress(item)} style={styles.imagesGrid}>
          //   <Image source={{ uri: item.media }} style={styles.postImage} />
          // </TouchableOpacity>
          <View style={styles.postContainer}></View>
        )}
        numColumns={3}
      /> */}

      {/* <StatusModal isVisible={viewStatus} selectedItem={statusData} onPressClose={() => setViewStatus(false)} /> */}

      <AlertBox
        open={alertModalVisible}
        title="Cancel Request!"
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
