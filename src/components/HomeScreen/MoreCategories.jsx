import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useToast } from "../../lib/ToastService";
import { apis } from "../../apis";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native"; // Importing MaterialCommunityIcons as an example

const categoryGroup = [
  { name: "Just for You", icon: <Icon name="star-outline" size={20} color="#000" /> },
  { name: "Women's & Girls' Fashion", icon: <Icon name="dress" size={20} color="#000" /> },
  { name: "Men's & Boys' Fashion", icon: <Icon name="tshirt-crew" size={20} color="#000" /> },
  { name: "Electronic Accessories", icon: <Icon name="headphones" size={20} color="#000" /> },
  { name: "TV & Home Appliances", icon: <Icon name="television" size={20} color="#000" /> },
  { name: "Electronics Device", icon: <Icon name="laptop" size={20} color="#000" /> },
  { name: "Mother & Baby", icon: <Icon name="baby-bottle-outline" size={20} color="#000" /> },
  { name: "Automotive & Motorbike", icon: <Icon name="car" size={20} color="#000" /> },
  { name: "Sports & Outdoors", icon: <Icon name="basketball" size={20} color="#000" /> },
  { name: "Home & Lifestyle", icon: <Icon name="sofa" size={20} color="#000" /> },
  { name: "Groceries", icon: <Icon name="shopping" size={20} color="#000" /> },
  { name: "Health & Beauty", icon: <Icon name="lipstick" size={20} color="#000" /> },
  { name: "Watches, Bags, Jewellery", icon: <Icon name="watch" size={20} color="#000" /> },
];


function MoreCategories() {

  const [categories, setCategories] = useState([]);
  const toast = useToast();
  const navigation = useNavigation();

  useEffect(() => {
    fetchPopularCategories();
  }, []);

  async function fetchPopularCategories() {
    try {
      const { data } = await apis.get("/categories");
      if (data.data) {
        setCategories(data.data);
      }
    } catch (ex) {
      toast.error("Failed to fetch popular categories");
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-small-left" style={{ color: "#1c1c1c", justifyContent: "center", fontSize: 25 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1c1c1c" }}>Just for you</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.sidebar}>
          <FlatList
            data={categoryGroup}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.categoryItem}>
                {item.icon}
                {/*<Image source={item.icon} style={styles.categoryIcon} />*/}
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <ScrollView contentContainerStyle={styles.productsGrid}>
          {categories?.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <Image source={{ uri: product.logo }} style={styles.productImage} />
              <Text style={styles.productText}>{product.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default MoreCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 100,
    backgroundColor: "#f5f5f5",
    paddingTop: 10,
  },
  categoryItem: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  categoryIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 12,
    textAlign: "center",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
  },
  productItem: {
    width: "33%",
    padding: 10,
    alignItems: "center",
  },
  productImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  productText: {
    fontSize: 12,
    textAlign: "center",
  },
});
