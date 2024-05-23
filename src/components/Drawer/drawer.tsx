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
  const { darkMode } = useAppSelector((state: RootState) => state.mode);

  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);

  const IconColor: string = darkMode ? colors.white : colors.black;
  const textColor: string = darkMode ? colors.white : colors.black;

  const onLogoutPress = () => setAlertModalVisible((prev) => !prev);
  const onCloseAlertBoxPress = () => setAlertModalVisible((prev) => !prev);
  const onConfirmLogoutPress = async () => await dispatch(logoutUser());

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? colors.blackDrawer : colors.white }]}>
      <View style={styles.flexAlignCenter}>
        <Image
          source={user?.profilePicture ? { uri: user?.profilePicture } : personPlaceholder}
          style={styles.profilePic}
        />
        <View style={styles.spacingTop}>
          <Text
            text={`${user?.firstname} ${user?.lastname}`}
            preset="bold"
            style={[styles.username, { color: textColor }]}
          />
          <Text
            text={user?.email}
            preset="light"
            style={[styles.useremail, { color: darkMode ? colors.lightShade : colors.textDark }]}
          />
        </View>
      </View>

      <View style={styles.bottomBlock}>
        <TouchableOpacity onPress={() => navigation.navigate("home")} style={styles.optionBlock}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="home-outline" size={20} color={IconColor} />
            <Text text="Home" style={[styles.navText, { color: textColor }]} />
          </View>
          <Ionicons name="chevron-forward" size={16} color={IconColor} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("contacts")} style={styles.optionBlock}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="chatbubbles-outline" size={20} color={IconColor} />
            <Text text="Contacts" style={[styles.navText, { color: textColor }]} />
          </View>
          <Ionicons name="chevron-forward" size={16} color={IconColor} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("profile")} style={styles.optionBlock}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="person-outline" size={20} color={IconColor} />
            <Text text="Profile" style={[styles.navText, { color: textColor }]} />
          </View>
          <Ionicons name="chevron-forward" size={16} color={IconColor} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBlock}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="shield-checkmark-outline" size={20} color={IconColor} />
            <Text text="Privacy Policy" style={[styles.navText, { color: textColor }]} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBlock} onPress={() => navigation.navigate("reportIssue")}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="alert-circle-outline" size={20} color={IconColor} />
            <Text text="Report an Issue" style={[styles.navText, { color: textColor }]} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBlock} onPress={onLogoutPress}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="log-out-outline" size={20} color={IconColor} />
            <Text text="Logout" style={[styles.navText, { color: textColor }]} />
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
