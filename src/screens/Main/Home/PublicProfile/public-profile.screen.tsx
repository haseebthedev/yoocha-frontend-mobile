import { FC, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UserI } from "store";
import { colors } from "theme";
import { UserStatusI } from "interfaces";
import { MY_PROFILE_DATA } from "constant";
import { NavigatorParamList } from "navigators";
import { AddFriendButton, Header, StatusModal, Text } from "components";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./public-profile.styles";

const PublicProfileScreen: FC<NativeStackScreenProps<NavigatorParamList, "publicProfile">> = ({
  navigation,
  route,
}) => {
  const { item }: { item: UserI } = route.params;
  const [viewStatus, setViewStatus] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Photos");
  const [statusData, setStatusData] = useState<UserStatusI>({
    id: "",
    name: "",
    profilePic: "",
    date: "",
    statusImage: "",
  });

  const onViewPress = (selectedItem) => {
    setStatusData({
      id: selectedItem.id,
      statusImage: selectedItem.media,
      name: "My Post",
      date: selectedItem.date,
      profilePic: selectedItem.profilePic,
    });
    setViewStatus((prev) => !prev);
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

      <FlatList
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
                  <Text text={item.country ? item?.country : `City, Country`} preset="light" />
                </View>
              </View>
              <View style={styles.infoContainer}>
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
                <AddFriendButton
                  title="Add Friend"
                  // onPress={onAddFriendBtnPress}
                />
              </View>

              <View>
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
          <TouchableOpacity onPress={() => onViewPress(item)} style={styles.imagesGrid}>
            <Image source={{ uri: item.media }} style={styles.postImage} />
          </TouchableOpacity>
        )}
        numColumns={3}
      />

      <StatusModal isVisible={viewStatus} selectedItem={statusData} onPressClose={() => setViewStatus(false)} />
    </View>
  );
};

export { PublicProfileScreen };
