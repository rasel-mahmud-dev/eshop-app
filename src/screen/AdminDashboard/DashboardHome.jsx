import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image, TouchableOpacity, View, ScrollView, RefreshControl, Alert } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { apis } from "../../apis";
import catchAxiosError from "../../utils/catchAxiosError";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AdminDashboardSidebar from "../../components/AdminDashboard/AdminDashboardSidebar";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const sidebarItems = [
  {
    name: "Dashboard",
    icon: () => <FontAwesome name="product-hunt" size={20} color="#000" />,
    id: "home_management",
  }, {
    name: "Product Management",
    icon: () => <FontAwesome name="product-hunt" size={20} color="#000" />,
    id: "product_management",
  },
  {
    name: "Order Management",
    icon: () => <FontAwesome name="shopping-cart" size={20} color="#000" />,
    id: "order_management",
  },
  {
    name: "User Management",
    icon: () => <FontAwesome name="users" size={20} color="#000" />,
    id: "user_management",
  },
  {
    name: "Dashboard",
    icon: () => <FontAwesome name="dashboard" size={20} color="#000" />,
    id: "dashboard",
  },
  {
    name: "Reports",
    icon: () => <FontAwesome name="bar-chart" size={20} color="#000" />,
    id: "reports",
  },
  {
    name: "Settings",
    icon: () => <FontAwesome name="cogs" size={20} color="#000" />,
    id: "settings",
  },
  {
    name: "Notifications",
    icon: () => <FontAwesome name="bell" size={20} color="#000" />,
    id: "notifications",
  },
  {
    name: "Messages",
    icon: () => <FontAwesome name="envelope" size={20} color="#000" />,
    id: "messages",
  },
  {
    name: "Help",
    icon: () => <FontAwesome name="question-circle" size={20} color="#000" />,
    id: "help",
  },
  {
    name: "Logout",
    icon: () => <FontAwesome name="sign-out" size={20} color="#000" />,
    id: "logout",
  },
  // Add more items as needed
];



const DashboardHome = () => {

  const navigation = useNavigation();
  const [dashboardSlats, setDashboardSlats] = useState({
    categories: 0,
    brands: 0,
  });


  function jumpScreen(item) {
    navigation.navigate("AdminDashboard::" + item.name);
  }

  const [refreshing, setRefreshing] = useState(false);

  async function fetchSlats() {
    const updateDashboardSlats = { ...dashboardSlats };
    const { data } = await apis.get("/admin/slats");
    updateDashboardSlats.categories = data?.data?.categories || 0;
    updateDashboardSlats.brands = data?.data?.brands || 0;
    setDashboardSlats(updateDashboardSlats);
  }

  useEffect(() => {
    fetchSlats();
  }, []);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      fetchSlats();
    } catch (ex) {
      Alert.alert(catchAxiosError(ex));
    } finally {
      setRefreshing(false);
    }
  };

  const [openSidebar, setOpenSidebar] = useState(true);
  const [selectedSidebarItem, setSelectedSidebarItem] = useState(sidebarItems[0]);

  const content = {
    "user_management": [
      {
        name: "Users",
        backgroundColor: "#1E90FF",
        icon: () => <MaterialIcons name="person" size={24} color="#fff" />,
        itemCount: 45, // Example count, update as necessary
      },
      {
        name: "Roles",
        backgroundColor: "#FFD700",
        icon: () => <FontAwesome name="shield" size={24} color="#fff" />,
        itemCount: 5, // Example count, update as necessary
      },
    ],
    "home_management": [
      {
        name: "Categories",
        backgroundColor: "#FF6347",
        icon: () => <FontAwesome name="tags" size={24} color="#fff" />,
        itemCount: dashboardSlats.categories,
      },
      {
        name: "Brands",
        backgroundColor: "#4682B4",
        icon: () => <FontAwesome name="th" size={24} color="#fff" />,
        itemCount: dashboardSlats.brands,
      },
      {
        name: "Products",
        backgroundColor: "rgba(38,227,67,0.62)",
        icon: () => <FontAwesome name="product-hunt" size={24} color="#fff" />,
        itemCount: 30,
      },
      {
        name: "Best Sellers",
        backgroundColor: "rgba(38,227,67,0.62)",
        icon: () => <FontAwesome name="star" size={24} color="#fff" />,
        itemCount: 30,
      },
      {
        name: "New Arrivals",
        backgroundColor: "rgba(252,218,52,0.6)",
        icon: () => <FontAwesome name="newspaper" size={24} color="#fff" />,
        itemCount: 75,
      },
      {
        name: "Offers",
        backgroundColor: "#FF4500",
        icon: () => <FontAwesome name="percent" size={24} color="#fff" />,
        itemCount: 10,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AdminDashboardSidebar
          items={sidebarItems}
          isOpen={openSidebar}
          activeItem={selectedSidebarItem}
          onSelectItem={setSelectedSidebarItem}
          onClose={() => setOpenSidebar(false)}
        />

        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={["#5851DB", "#C13584", "#E1306C", "#FD1D1D"]}
          style={styles.gradient}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setOpenSidebar(true)} style={styles.menuButton}>
              <FontAwesome name="bars" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{selectedSidebarItem?.name || "Dashboard"}</Text>
          </View>

          <ScrollView
            refreshControl={
              <RefreshControl
                progressBackgroundColor={"rgba(111,169,218,0.98)"}
                progressColor={"green"}
                colors={["#5851DB", "#C13584"]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            style={styles.scrollView}
          >

            <View style={styles.menuContainer}>
              {content[selectedSidebarItem.id]?.map((item, index) => (
                <TouchableOpacity
                  onPress={() => jumpScreen(item)}
                  key={index}
                  style={[styles.card, { backgroundColor: item.backgroundColor }]}
                >
                  {item.icon()}
                  <Text style={styles.cardText}>{item.name}</Text>
                  <Text style={styles.itemCountText}>{item.itemCount} items</Text>
                </TouchableOpacity>
              ))}
            </View>

          </ScrollView>
        </LinearGradient>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  menuButton: {
    padding: 10,
    backgroundColor: "#5851DB",
    borderRadius: 5,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
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
    padding: 10,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 30,
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
