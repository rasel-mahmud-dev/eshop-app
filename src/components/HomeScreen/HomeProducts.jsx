import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, StyleSheet, Image, Text, ScrollView, Dimensions } from "react-native";
import { useToast } from "../../lib/ToastService";
import { apis } from "../../apis";
import CustomTabBar from "./CustomTabBar";
import { SafeAreaView } from "react-native-safe-area-context"; // Make sure to import CustomTabBar

const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  const toast = useToast();
  const tabs = ["For You", "Free Delivery", "Buy More"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    fetchProducts();
  }, [activeTab]);

  async function fetchProducts() {
    try {
      // You might want to adjust this URL based on the active tab
      const { data } = await apis.get(`/products`);
      if (data.data) {
        setProducts(data.data);
      }
    } catch (ex) {
      toast.error("Failed to fetch products");
    }
  }

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  let www = Dimensions.get("window").width / 2;
  return (
    <>
      <View style={styles.container}>

        <ScrollView
          pagingEnabled={true}
          horizontal={true}
          snapToAlignment="start"
          decelerationRate="normal"
          snapToInterval={www * 2}
        >
          <View style={{ width: www }}>
            <Text>AAAAAAA</Text>
            <ScrollView style={styles.container}>
              {products.map(item => renderProduct({ item }))}
            </ScrollView>
          </View>

          <View style={{ width: www }}>
            <Text>BBBB</Text>
            <ScrollView style={styles.container}>
              {products.map(item => renderProduct({ item }))}
            </ScrollView>
          </View>


          <View style={{ width: www }}>
            <Text>TAb 2 AAAAAAA</Text>
            <ScrollView style={styles.container}>
              {products.map(item => renderProduct({ item }))}
            </ScrollView>
          </View>

          <View style={{ width: www }}>
            <Text>TAb 2 BBBB</Text>
            <ScrollView style={styles.container}>
              {products.map(item => renderProduct({ item }))}
            </ScrollView>
          </View>
        </ScrollView>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#F5F5F5",
  },
  card: {
    margin: 6,
    flex: 1,
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  details: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 14,
    color: "#1E90FF",
    marginTop: 5,
  },
});

export default HomeProducts;
