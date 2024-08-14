import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "react-native-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../../styles/colors";

const DashboardBottomNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const navItems = [
    { name: "Home", icon: "home", path: "Home" },
    { name: "Seller", icon: "shopping-cart", path: "Cart" },
    { name: "Profile", icon: "person", path: "Profile" },
    { name: "Dashboard", icon: "dashboard", path: "AdminDashboard" }, // Admin Dashboard item
  ];

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
              onPress={() => navigation.navigate(item.path)}
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

export default DashboardBottomNavigation;

