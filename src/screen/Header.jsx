import React from "react";
import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import colors from "../styles/colors";

const Header = ({ auth }) => {
  const navigation = useNavigation();

  function handlePushSearch() {
    navigation.navigate("SearchSuggestion");
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image
          source={{ uri: "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100270.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723248000&semt=ais_hybrid" }}
          style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePushSearch}
                        style={styles.searchBar}>
        <Text style={styles.searchBarText}>Search on RsShop</Text>
        <View style={styles.searchBarIconWrapper}>

          <AntDesign name={"search1"} style={styles.searchBarIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
  },

  logo: {
    width: 45,
    aspectRatio: 1,
    borderRadius: 25,
  },
  searchBar: {
    flex: 1,
    marginLeft: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors["primary-400"],
    height: 40,
    backgroundColor: "transparent",
    color: colors["gray-14"],
    fontWeight: "500",
    width: "100%",
    overflow: "hidden",
    paddingVertical: 6,
  },
  searchBarText: {
    fontWeight: "500",
    color: colors["gray-8"],
  },
  searchBarIconWrapper: {
    position: "absolute",
    right: 0,
    height: 45,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(76,178,90,0.25)",
  },
  searchBarIcon: {
    color: colors["primary-400"],
    fontSize: 20,

  },
});

export default Header;
