import { FC, useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, TouchableOpacity, View } from "react-native";

import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { colors } from "theme";
import { MY_PROFILE_DATA } from "constant";
import { EmptyListText, Text } from "components";
import { RootState, getMyProfileService, useAppDispatch, useAppSelector } from "store";
import noImage from "assets/images/personPlaceholder.jpeg";
import styles from "./profile.styles";

const ProfileScreen: FC<NativeStackScreenProps<NavigatorParamList, "profile">> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { darkMode } = useAppSelector((state: RootState) => state.mode);

  const userName: string = `${user?.firstname} ${user?.lastname}` ?? `Guest`;

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

      <View style={[styles.mainContainer, { backgroundColor: darkMode ? colors.black : colors.white }]}>
        <View style={styles.roundedContainer}>
          <Image source={user?.profilePicture ? { uri: user.profilePicture } : noImage} style={styles.profilePic} />
          <Text
            text={userName}
            preset="largeHeading"
            style={[styles.name, { color: darkMode ? colors.white : colors.textDim }]}
          />

          <View style={styles.location}>
            {user?.country && (
              <>
                <Ionicons name="location-sharp" size={18} color={darkMode ? colors.white : colors.textDark} />
                <Text
                  text={user?.country}
                  preset="light"
                  style={{ color: darkMode ? colors.lightShade : colors.textDim }}
                />
              </>
            )}
          </View>

          {/* <View style={styles.infoContainer}>
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
        </View> */}

          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("editprofile")} style={styles.btn}>
              <Text text="Edit Profile" style={styles.btnText} />
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={styles.tabNavTopSpacing}>
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
        </View> */}
      </View>
    </View>
  );
};

export { ProfileScreen };
