import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import Header from "./Header";
import Category from "./Category";
import Product from "./Product";

const products = [
  { name: "Product 1", price: "$10", image: "https://ikall.in/wp-content/uploads/2023/06/51sJmHfw92L._SL1000_-300x300.jpg" },
  { name: "Product 1", price: "$10", image: "https://ikall.in/wp-content/uploads/2023/06/51sJmHfw92L._SL1000_-300x300.jpg" },
  { name: "Product 1", price: "$10", image: "https://ikall.in/wp-content/uploads/2023/06/51sJmHfw92L._SL1000_-300x300.jpg" },
  { name: "Product 1", price: "$10", image: "https://ikall.in/wp-content/uploads/2023/06/51sJmHfw92L._SL1000_-300x300.jpg" },
  { name: "Product 1", price: "$10", image: "https://ikall.in/wp-content/uploads/2023/06/51sJmHfw92L._SL1000_-300x300.jpg" },
  { name: "Product 1", price: "$10", image: "https://ikall.in/wp-content/uploads/2023/06/51sJmHfw92L._SL1000_-300x300.jpg" },
  { name: "Product 2", price: "$20", image: "https://5.imimg.com/data5/SELLER/Default/2023/3/292019880/YM/MK/PO/104903331/apple-iphone-14-pro-max-250x250.jpg" },
  { name: "Product 2", price: "$20", image: "https://5.imimg.com/data5/SELLER/Default/2023/3/292019880/YM/MK/PO/104903331/apple-iphone-14-pro-max-250x250.jpg" },
  // Add more products as needed
];

const HomePage = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Category />
      <View style={styles.productContainer}>
        {products.map((product, index) => (
          <Product key={index} {...product} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#f5f5f5',
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
});

export default HomePage;
