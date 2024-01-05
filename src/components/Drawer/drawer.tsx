import { colors } from "theme";
import { Text } from "components";
import { MY_PROFILE_DATA } from "constant";
import { Image, TouchableOpacity, View } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NavigatorParamList } from "navigators";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";

type CustomHomeDrawerProps = {
  navigation: DrawerNavigationProp<NavigatorParamList, "main">;
};

const CustomHomeDrawer: React.FC<CustomHomeDrawerProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexAlignCenter}>
        <Image source={{ uri: MY_PROFILE_DATA.profilePic }} style={styles.profilePic} />
        <View style={styles.spacingTop}>
          <Text
            text={MY_PROFILE_DATA.firstname + " " + MY_PROFILE_DATA.lastname}
            preset="bold"
            style={styles.username}
          />
          <Text text={MY_PROFILE_DATA.email} preset="light" style={styles.useremail} />
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
        <TouchableOpacity style={styles.optionBlock} onPress={() => navigation.navigate("signin")}>
          <View style={styles.innerLeftBlock}>
            <Ionicons name="log-out-outline" size={20} color={colors.white} />
            <Text text="Logout" style={styles.navText} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { CustomHomeDrawer };
