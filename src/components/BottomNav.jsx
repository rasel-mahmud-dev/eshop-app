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

    navItems.push({ name: "Admin", icon: "dashboard", path: "AdminDashboard" });
  //
  const location = route.name;

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["rgba(88,81,219,0.82)", "rgba(225,48,108,0.76)"]}
        style={styles.gradient}
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
                size={30}
                color={location === item.path ? colors["blue-500"] : colors["gray-200"]}
              />
              <Text
                style={{
                  color: location === item.path ? colors["blue-500"] : colors["gray-200"],
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 60,
  },
  gradient: {
    height: 60,
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
