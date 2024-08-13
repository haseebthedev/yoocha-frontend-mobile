import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { AlertBox, Text } from "components";
import { NavigatorParamList } from "navigators";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootState, logoutUser, useAppDispatch, useAppSelector } from "store";
import personplaceholder from "assets/images/person.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAppTheme } from "hooks";
import createStyles from "./styles";
import { ScreenEnum } from "enums";

type CustomHomeDrawerProps = {
  navigation: DrawerNavigationProp<NavigatorParamList, "main">;
};

const CustomHomeDrawer: React.FC<CustomHomeDrawerProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state: RootState) => state.auth);
  const { theme } = useAppTheme();

  const styles = createStyles(theme);

  const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);

  const onLogoutPress = () => setAlertModalVisible((prev) => !prev);
  const onCloseAlertBoxPress = () => setAlertModalVisible((prev) => !prev);
  const onConfirmLogoutPress = async () => await dispatch(logoutUser());

  return (
    <View style={styles.container}>
      <View style={styles.flexAlignCenter}>
        <View style={styles.profileImageContainer}>
          <Image
            source={user?.profilePicture ? { uri: user?.profilePicture } : personplaceholder}
            style={user?.profilePicture ? styles.profilePic : styles.placeholderImage}
          />
        </View>
        <View style={styles.spacingTop}>
          <Text text={`${user?.firstname} ${user?.lastname}`} preset="bold" style={styles.username} />
          <Text text={user?.email} preset="light" style={styles.useremail} />
        </View>
      </View>

      <View style={styles.bottomBlock}>
        <TouchableOpacity onPress={() => navigation.navigate(ScreenEnum.HOME)} style={styles.optionBlock}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="home-outline" size={20} color={theme.colors.iconColor} />
            <Text text="Home" style={styles.navText} />
          </View>
          <Ionicons name="chevron-forward" size={16} color={theme.colors.iconColor} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate(ScreenEnum.CONTACTS)} style={styles.optionBlock}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="chatbubbles-outline" size={20} color={theme.colors.iconColor} />
            <Text text="Contacts" style={styles.navText} />
          </View>
          <Ionicons name="chevron-forward" size={16} color={theme.colors.iconColor} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate(ScreenEnum.PROFILE)} style={styles.optionBlock}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="person-outline" size={20} color={theme.colors.iconColor} />
            <Text text="Profile" style={styles.navText} />
          </View>
          <Ionicons name="chevron-forward" size={16} color={theme.colors.iconColor} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBlock}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="shield-checkmark-outline" size={20} color={theme.colors.iconColor} />
            <Text text="Privacy Policy" style={styles.navText} />
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.optionBlock} onPress={() => navigation.navigate(ScreenEnum.REPORT_ISSUE)}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="alert-circle-outline" size={20} color={theme.colors.iconColor} />
            <Text text="Report an Issue" style={styles.navText} />
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.optionBlock} onPress={onLogoutPress}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="log-out-outline" size={20} color={theme.colors.iconColor} />
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
