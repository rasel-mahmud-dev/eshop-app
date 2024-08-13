import React, { useState } from "react";
import { StyleSheet, Text, Image, TouchableOpacity, View, ScrollView, RefreshControl, Alert } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { apis } from "../../apis";
import catchAxiosError from "../../utils/catchAxiosError";

const DashboardHome = () => {

  const navigation = useNavigation();

  const [dashboardSlats, setDashboardSlats] = useState({
    categories: 0,
    brands: 0,
  });

  const menuItems = [
    {
      name: "Categories",
      backgroundColor: "#FF6347",
      iconUrl: "https://ikall.in/wp-content/uploads/2023/06/51sJmHfw92L._SL1000_-300x300.jpg",
      itemCount: dashboardSlats.categories,
    },
    {
      name: "Brands",
      backgroundColor: "#4682B4",
      iconUrl: "https://ikall.in/wp-content/uploads/2023/06/51sJmHfw92L._SL1000_-300x300.jpg",
      itemCount: dashboardSlats.brands,
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

  const route = useRoute();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const updateDashboardSlats = { ...dashboardSlats };
      const { data } = await apis.get("/admin/slats");
      updateDashboardSlats.categories = data?.data?.categories || 0;
      setDashboardSlats(updateDashboardSlats);
    } catch (ex) {
      Alert.alert(catchAxiosError(ex));
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#5851DB", "#C13584", "#E1306C", "#FD1D1D"]}
        style={styles.linkTextinearGradient}
      >
        <ScrollView refreshControl={
          <RefreshControl
            progressBackgroundColor={"rgba(111,169,218,0.98)"}
            progressColor={"green"}
            colors={["#5851DB", "#C13584"]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
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
        </ScrollView>

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
