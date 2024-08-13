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
    { name: "Home", icon: "home", path: "/" },
    { name: "Profile", icon: "person", path: "/profile" },
    { name: "Settings", icon: "settings", path: "/settings" },
    { name: "Meals", icon: "meals", path: "/meals" },
    { name: "Dashboard", icon: "meals", path: "AdminDashboard" },
  ];

  const location = {};

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
              onPress={() => navigation.navigate(item.path, JSON.stringify({ prevRoute: route.name}))}
            >
              <Icon
                name={item.icon}
                size={30}
                color={location.pathname === item.route ? colors["blue-500"] : colors["gray-200"]}
              />
              <Text
                style={{
                  color: location.pathname === item.route ? colors["blue-500"] : colors["gray-200"],
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
    // backgroundColor: "#192f6a",
    // paddingVertical: 3,
    // borderTopWidth: 1,
    // borderTopColor: "#334981",
    // position: "absolute",
    // bottom: 0,
    // width: "100%",
  },
  navItem: {
    alignItems: "center",
  },
});

export default BottomNav;
