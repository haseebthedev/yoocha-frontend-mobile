import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParamList } from "navigators";
import { colors } from "theme";
import { Text } from "components";
import { MY_PROFILE_DATA } from "constant";
import { RootState, useAppSelector } from "../../../store/store";
import noImage from "../../../assets/images/noImage.jpeg";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./profile.styles";

const ProfileScreen: FC<NativeStackScreenProps<NavigatorParamList, "profile">> = ({ navigation }) => {
  const { user, loading: userLoading } = useAppSelector((state: RootState) => state.auth);

  console.log("user === ", user);

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
          <Text text={user?.firstname + " " + user?.lastname} preset="largeHeading" style={styles.name} />

          <View style={styles.location}>
            <Ionicons name="location-sharp" size={18} color={colors.textDark} />
            <Text text={MY_PROFILE_DATA.city + ", " + MY_PROFILE_DATA.country} preset="light" />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoHeading}>
            <Text text={String(MY_PROFILE_DATA.friends)} style={styles.info} />
            <Text text="Friends" style={styles.infoText} />
          </View>
          <View style={styles.infoHeading}>
            <Text text={String(MY_PROFILE_DATA.pending)} style={styles.info} />
            <Text text="Pending" style={styles.infoText} />
          </View>
          <View style={styles.infoHeading}>
            <Text text={String(MY_PROFILE_DATA.blocked)} style={styles.info} />
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
            <Text text="Photos" style={styles.tabNavText} />
            <Text text="Likes" style={[styles.tabNavText, { color: colors.grey }]} />
          </View>
          <View style={styles.divider} />

          <FlatList
            horizontal={true}
            data={MY_PROFILE_DATA.myPosts}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainerStyle}
            renderItem={({ item }) => <Image source={{ uri: item.media }} style={styles.postImage} />}
          />
        </View>
      </View>
    </View>
  );
};

export { ProfileScreen };
