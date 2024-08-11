import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const DashboardHome = () => {

  const navigation = useNavigation();

  const menuItems = [
    {
      name: "Categories",
      backgroundColor: "#FF6347",
      iconUrl: "https://ikall.in/wp-content/uploads/2023/06/51sJmHfw92L._SL1000_-300x300.jpg",
      itemCount: 120,
    },
    {
      name: "Brands",
      backgroundColor: "#4682B4",
      iconUrl: "https://ikall.in/wp-content/uploads/2023/06/51sJmHfw92L._SL1000_-300x300.jpg",
      itemCount: 50,
    },
    {
      name: "Best Sellers",
      backgroundColor: "rgba(38,227,67,0.62)",
      iconUrl: "https://5.imimg.com/data5/SELLER/Default/2023/3/292019880/YM/MK/PO/104903331/apple-iphone-14-pro-max-250x250.jpg",
      itemCount: 30,
    },
    {
      name: "New Arrivals",
      backgroundColor: "rgba(252,218,52,0.6)",
      iconUrl: "https://5.imimg.com/data5/SELLER/Default/2023/3/292019880/YM/MK/PO/104903331/apple-iphone-14-pro-max-250x250.jpg",
      itemCount: 75,
    },
    {
      name: "Offers",
      backgroundColor: "#FF4500",
      iconUrl: "https://5.imimg.com/data5/SELLER/Default/2023/3/292019880/YM/MK/PO/104903331/apple-iphone-14-pro-max-250x250.jpg",
      itemCount: 10,
    },
  ];

  function jumpScreen(item) {
    navigation.navigate("AdminDashboard::" + item.name);
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#5851DB", "#C13584", "#E1306C", "#FD1D1D"]}
        style={styles.linkTextinearGradient}
      >

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity onPress={() => jumpScreen(item)} key={index}
                              style={[styles.card, { backgroundColor: item.backgroundColor }]}>
              <Image source={{ uri: item.iconUrl }} style={styles.icon} />
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.itemCountText}>{item.itemCount} items</Text>
            </TouchableOpacity>
          ))}
        </View>


      </LinearGradient></View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "#ddd"
  },

  linkTextinearGradient: {
    height: "100%",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    height: 120,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  itemCountText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },


});

export default DashboardHome;
