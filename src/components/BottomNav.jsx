import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../styles/colors";
import { LinearGradient } from "react-native-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuthStore } from "../store";

const BottomNav = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {auth} = useAuthStore()

  const { cartItems } = useAuthStore();

  const navItems = [
    { name: "Home", icon: "home", path: "Home" },
    { name: "Categories", icon: "category", path: "Categories" },
    { name: "Cart", icon: "shopping-cart", path: "Cart" },
    { name: "Orders", icon: "receipt", path: "Orders" },
    { name: "Account", icon: "account-circle", path: "Profile" },
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
              style={styles.navItem(location === item.path)}
              onPress={() => navigation.navigate(item.path, JSON.stringify({ prevRoute: route.name }))}
            >
              <View>
                {auth?.id && item.name === "Cart" && <Text style={styles.cartCount}>{cartItems?.length}</Text>}
                <Icon
                  name={item.icon}
                  size={28}
                  color={location === item.path ? colors["primary-500"] : colors["gray-10"]}
                />
              </View>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: location === item.path ? 600 : 200,
                  color: location === item.path ? colors["primary-500"] : colors["gray-20"],
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
    backgroundColor: "white",
    elevation: 10,
    shadowOpacity: 1,
    shadowColor: "#000000",
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  navItem: (active) => ({
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    minWidth: 50,
    borderRadius: 50,
    // backgroundColor: "rgba(111,169,218,0.2)",
  }),

  cartCount: {
    color: "white",
    fontWeight: "600",
    position: "absolute",
    left: 10,
    top: -3,
    fontSize: 8,
    backgroundColor: "red",
    height: 12,
    borderWidth: 1,
    borderColor: "#ffffff",
    minWidth: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    zIndex: 1,
  },
});

export default BottomNav;
