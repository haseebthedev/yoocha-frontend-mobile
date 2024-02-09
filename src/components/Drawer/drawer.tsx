import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { colors } from "theme";
import { AlertBox, Text } from "components";
import { NavigatorParamList } from "navigators";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootState, logoutUser, useAppDispatch, useAppSelector } from "store";
import personPlaceholder from "assets/images/personPlaceholder.jpeg";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

type CustomHomeDrawerProps = {
  navigation: DrawerNavigationProp<NavigatorParamList, "main">;
};

const CustomHomeDrawer: React.FC<CustomHomeDrawerProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state: RootState) => state.auth);
  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);

  const onLogoutPress = () => setAlertModalVisible((prev) => !prev);
  const onCloseAlertBoxPress = () => setAlertModalVisible((prev) => !prev);
  const onConfirmLogoutPress = async () => await dispatch(logoutUser());

  return (
    <View style={styles.container}>
      <View style={styles.flexAlignCenter}>
        <Image
          source={user?.profilePicture ? { uri: user?.profilePicture } : personPlaceholder}
          style={styles.profilePic}
        />
        <View style={styles.spacingTop}>
          <Text text={`${user?.firstname} ${user?.lastname}`} preset="bold" style={styles.username} />
          <Text text={user?.email} preset="light" style={styles.useremail} />
        </View>
      </View>

      <View style={styles.bottomBlock}>
        <TouchableOpacity onPress={() => navigation.navigate("home")} style={styles.optionBlock}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="home-outline" size={20} color={colors.white} />
            <Text text="Home" style={styles.navText} />
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("contacts")} style={styles.optionBlock}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="chatbubbles-outline" size={20} color={colors.white} />
            <Text text="Contacts" style={styles.navText} />
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("profile")} style={styles.optionBlock}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="person-outline" size={20} color={colors.white} />
            <Text text="Profile" style={styles.navText} />
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBlock}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="shield-checkmark-outline" size={20} color={colors.white} />
            <Text text="Privacy Policy" style={styles.navText} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBlock} onPress={() => navigation.navigate("reportIssue")}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="alert-circle-outline" size={20} color={colors.white} />
            <Text text="Report an Issue" style={styles.navText} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBlock} onPress={onLogoutPress}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="log-out-outline" size={20} color={colors.white} />
            <Text text="Logout" style={styles.navText} />
          </View>
        </TouchableOpacity>
      </View>

      <AlertBox
        open={alertModalVisible}
        title="Logout!"
        description="Are you sure you want to logout?"
        onClose={onCloseAlertBoxPress}
        secondaryButtonText="Cancel"
        primaryButtonText="Logout"
        secondaryOnClick={() => setAlertModalVisible((prev) => !prev)}
        primaryOnClick={onConfirmLogoutPress}
      />
    </View>
  );
};

export { CustomHomeDrawer };
