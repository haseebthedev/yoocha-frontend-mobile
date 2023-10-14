import { FC } from "react";
import { Text } from "components";
import { FlatList, Image, TextInput, TouchableOpacity, View } from "react-native";
import { NavigatorParamList } from "navigators";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { colors } from "theme";
import { USER_MESSAGING_DATA } from "constant";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { wp } from "utils/responsive";

const UserMessagingScreen: FC<NativeStackScreenProps<NavigatorParamList, "usermessaging">> = ({
  navigation,
  route,
}) => {
  const id = "1";
  const username = "Muhammad Ali";
  const lastSeen = "8:14 PM";

  return (
    <View style={styles.container}>
      {/* App Header */}
      <View style={styles.appHeader}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" color={colors.textDark} size={20} />
          </TouchableOpacity>
          <Image source={{ uri: "https://picsum.photos/218" }} style={styles.profileImage} />
          <View>
            <Text text={username} preset="heading" />
            <Text text={`Last seen: ${lastSeen}`} style={{ fontSize: 10 }} />
          </View>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: colors.lightShade }}>
        <FlatList
          data={USER_MESSAGING_DATA}
          keyExtractor={(item, index) => String(item.id + index)}
          contentContainerStyle={{ paddingVertical: 20, flexGrow: 1 }}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: item.id === id ? "flex-end" : "flex-start",
                paddingHorizontal: 10,
              }}
            >
              {item.id !== id && (
                <Image
                  source={{ uri: item.profilePic }}
                  style={{ width: wp(10), height: wp(10), borderRadius: wp(5), marginTop: 10, marginRight: 10 }}
                />
              )}

              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                {item.id === id && <Text text="12:05" style={{ fontSize: 10, color: colors.textDim }} />}
                <Text
                  text={item.message}
                  style={{
                    maxWidth: wp(65),
                    backgroundColor: item.id === id ? colors.primaryLight : colors.white,
                    color: item.id === id ? colors.white : colors.textDim,
                    padding: 10,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: item.id !== id ? 20 : 5,
                    borderBottomLeftRadius: item.id === id ? 20 : 5,
                    elevation: 1,
                  }}
                />

                {item.id !== id && <Text text="12:05" style={{ fontSize: 10, color: colors.textDim }} />}
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ paddingVertical: 4 }} />}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.white,
            paddingVertical: 10,
            gap: 20,
            paddingHorizontal: wp(5),
            position: "absolute",
            bottom: 0,
          }}
        >
          <TextInput
            placeholder="Type here..."
            placeholderTextColor={colors.textDim}
            style={{
              width: wp(80),
              backgroundColor: "#DCDCDC",
              color: colors.textDim,
              borderRadius: 10,
              paddingVertical: 4,
              paddingHorizontal: 12,
            }}
          />

          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="send" color={colors.primary} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export { UserMessagingScreen };
