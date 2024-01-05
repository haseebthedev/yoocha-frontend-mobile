import { FC, useRef, useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigatorParamList } from "navigators";
import { colors } from "theme";
import { AddFriendButton, Header, StatusModal, Text } from "components";
import { hp, wp } from "utils/responsive";
import { UserStatusI } from "../home.screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./public-profile.styles";

const PublicProfileScreen: FC<NativeStackScreenProps<NavigatorParamList, "publicProfile">> = ({
  navigation,
  route,
}) => {
  const { item } = route.params;
  const [viewStatus, setViewStatus] = useState<boolean>(false);
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

  const flatListKey = useRef(0);
  const keyExtractor = (_, index) => `${flatListKey.current}-${index}`;

  return (
    // <View style={styles.container}>
    //   <Header
    //     headerText={"YOOCHAT"}
    //     leftIcon="chevron-back"
    //     onLeftPress={() => navigation.goBack()}
    //     iconStyle={colors.white}
    //     titleStyle={{ color: colors.white }}
    //   />

    //   <View style={styles.mainContainer}>
    //     <View style={styles.roundedContainer}>
    //       <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
    //       <Text text={`${item.firstname} ${item.lastname}`} preset="largeHeading" style={styles.name} />

    //       <View style={styles.location}>
    //         <Ionicons name="location-sharp" size={18} color={colors.textDark} />
    //         <Text text={item.city + ", " + item.country} preset="light" />
    //       </View>
    //     </View>

    //     <View style={styles.infoContainer}>
    //       <View style={{ flexDirection: "column", alignItems: "center" }}>
    //         <Text text={String(item.posts.length)} style={styles.info} />
    //         <Text text="Posts" style={styles.infoText} />
    //       </View>
    //       <View style={{ flexDirection: "column", alignItems: "center" }}>
    //         <Text text={String(item.noOfFriends)} style={styles.info} />
    //         <Text text="Friends" style={styles.infoText} />
    //       </View>
    //       <View style={{ flexDirection: "column", alignItems: "center" }}>
    //         <Text text={String(item.likes)} style={styles.info} />
    //         <Text text="Likes" style={styles.infoText} />
    //       </View>
    //     </View>

    //     <View style={{ marginTop: hp(3.8) }}>
    //       <AddFriendButton title="Add Friend" onPress={() => console.log("Add Friend")} />
    //     </View>

    //     <View style={styles.tabNavContainer}>
    //       <FlatList
    //         key={flatListKey.current++}
    //         data={item.posts}
    //         keyExtractor={(item) => item.id}
    //         contentContainerStyle={{ gap: hp(2) }}
    //         ListHeaderComponent={() => (
    //           <View>
    //             <View style={styles.tabNav}>
    //               <Text text="Photos" style={styles.tabNavText} />
    //               <Text text="Likes" style={[styles.tabNavText, { color: colors.grey }]} />
    //             </View>
    //             <View style={styles.divider} />
    //           </View>
    //         )}
    //         renderItem={({ item }) => (
    //           <TouchableOpacity onPress={() => onViewPress(item)} style={{ marginRight: wp(3) }}>
    //             <Image source={{ uri: item.media }} style={styles.postImage} />
    //           </TouchableOpacity>
    //         )}
    //         numColumns={3}
    //       />
    //     </View>
    //   </View>

    //   <StatusModal isVisible={viewStatus} selectedItem={statusData} onPressClose={() => setViewStatus(false)} />
    // </View>
    <View style={styles.container}>
      <Header
        headerText={"YOOCHAT"}
        leftIcon="chevron-back"
        onLeftPress={() => navigation.goBack()}
        iconStyle={colors.white}
        titleStyle={{ color: colors.white }}
      />

      <View style={styles.mainContainer}>
        <View style={styles.roundedContainer}>
          <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
          <Text text={`${item.firstname} ${item.lastname}`} preset="largeHeading" style={styles.name} />

          <View style={styles.location}>
            <Ionicons name="location-sharp" size={18} color={colors.textDark} />
            <Text text={item.city + ", " + item.country} preset="light" />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text text={String(item.posts.length)} style={styles.info} />
            <Text text="Posts" style={styles.infoText} />
          </View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text text={String(item.noOfFriends)} style={styles.info} />
            <Text text="Friends" style={styles.infoText} />
          </View>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text text={String(item.likes)} style={styles.info} />
            <Text text="Likes" style={styles.infoText} />
          </View>
        </View>

        <View style={{ marginTop: hp(3.8) }}>
          <AddFriendButton title="Add Friend" onPress={() => console.log("Add Friend")} />
        </View>

        <View style={styles.tabNavContainer}>
          <FlatList
            key={flatListKey.current++}
            data={item.posts}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: hp(2) }}
            ListHeaderComponent={() => (
              <View>
                <View style={styles.tabNav}>
                  <Text text="Photos" style={styles.tabNavText} />
                  <Text text="Likes" style={[styles.tabNavText, { color: colors.grey }]} />
                </View>
                <View style={styles.divider} />
              </View>
            )}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onViewPress(item)} style={{ marginRight: wp(3) }}>
                <Image source={{ uri: item.media }} style={styles.postImage} />
              </TouchableOpacity>
            )}
            numColumns={3}
          />
        </View>
      </View>

      <StatusModal isVisible={viewStatus} selectedItem={statusData} onPressClose={() => setViewStatus(false)} />
    </View>
  );
};

export { PublicProfileScreen };
