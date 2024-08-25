import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../styles/colors";
import { LinearGradient } from "react-native-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";

const BottomNav = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const navItems = [
    { name: "Home", icon: "home", path: "Home" },
    { name: "Categories", icon: "category", path: "Categories" },
    { name: "Cart", icon: "shopping-cart", path: "Cart" },
    { name: "Orders", icon: "receipt", path: "Orders" },
    { name: "Profile", icon: "person", path: "Profile" },
  ];
  // Add Admin Dashboard if the user is an admin
  // if (userRole === "admin") {

    // navItems.push({ name: "Admin", icon: "dashboard", path: "AdminDashboard" });
  //
  const location = route.name;

  return (
    <View style={styles.wrapper}>
      <View style={styles.gradient}
      >
        <View style={styles.navContainer}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={styles.navItem}
              onPress={() => navigation.navigate(item.path, JSON.stringify({ prevRoute: route.name }))}
            >
              <Icon
                name={item.icon}
                size={20}
                color={location === item.path ? colors["blue-500"] : colors["gray-900"]}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: location === item.path ? colors["blue-500"] : colors["gray-900"],
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 55,

  },
  gradient: {
    backgroundColor:"white",
    elevation: 10,
    shadowOpacity: 1,
    shadowColor: "#000000"
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  navItem: {
    alignItems: "center",
  },
});

export default BottomNav;
