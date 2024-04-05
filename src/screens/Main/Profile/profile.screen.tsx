import { FC, useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, TouchableOpacity, View } from "react-native";
import { EmptyListText, Text } from "components";
import { colors } from "theme";
import { MY_PROFILE_DATA } from "constant";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootState, getMyProfileService, useAppDispatch, useAppSelector } from "store";
import noImage from "assets/images/personPlaceholder.jpeg";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./profile.styles";

const ProfileScreen: FC<NativeStackScreenProps<NavigatorParamList, "profile">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [activeTab, setActiveTab] = useState<string>("Photos");
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const userLocation: string = user?.country ? `${user?.country}` : `Unknown`;
  const userName: string = user?.firstname || user?.lastname ? `${user?.firstname} ${user?.lastname}` : `Username`;

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    dispatch(getMyProfileService());
  }, []);

  return (
    <View style={styles.container}>
      {/* App Header */}
      <View style={styles.appHeader}>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <MaterialCommunityIcons name="menu" color={colors.white} size={24} />
        </TouchableOpacity>
        <Text text="YOOCHAT" preset="logo" style={styles.headerText} />

        <TouchableOpacity onPress={() => navigation.navigate("settings")}>
          <Ionicons name="settings-outline" color={colors.white} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.roundedContainer}>
          <Image source={user?.profilePicture ? { uri: user.profilePicture } : noImage} style={styles.profilePic} />
          <Text text={userName} preset="largeHeading" style={styles.name} />

          <View style={styles.location}>
            <Ionicons name="location-sharp" size={18} color={colors.textDark} />
            <Text text={userLocation} preset="light" />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoHeading}>
            <Text text={String(0)} style={styles.info} />
            <Text text="Friends" style={styles.infoText} />
          </View>
          <View style={styles.infoHeading}>
            <Text text={String(0)} style={styles.info} />
            <Text text="Pending" style={styles.infoText} />
          </View>
          <View style={styles.infoHeading}>
            <Text text={String(0)} style={styles.info} />
            <Text text="Blocked" style={styles.infoText} />
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("editprofile")} style={styles.btn}>
            <Text text="Edit Profile" style={styles.btnText} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabNavTopSpacing}>
          <View style={styles.tabNav}>
            <TouchableOpacity onPress={() => setActiveTab("Photos")}>
              <Text text="Photos" style={[styles.tabNavText, activeTab === "Photos" && { color: colors.primary }]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab("Likes")}>
              <Text text="Likes" style={[styles.tabNavText, activeTab === "Likes" && { color: colors.primary }]} />
            </TouchableOpacity>
          </View>
          <View style={styles.divider} />

          <View style={styles.tabContainer}>
            {activeTab === "Photos" && (
              <FlatList
                horizontal={true}
                data={MY_PROFILE_DATA.myPosts}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainerStyle}
                renderItem={({ item }) => <Image source={{ uri: item.media }} style={styles.postImage} />}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
                }
              />
            )}

            {activeTab === "Likes" && (
              <View>
                <EmptyListText text="There are no Likes!" />
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export { ProfileScreen };
