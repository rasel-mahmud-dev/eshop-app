import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Product = ({ name, price, image }) => {
  return (
    <View style={styles.product}>
      <View style={styles.imageWrapper}>

        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    width: "48%",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: 150,
    aspectRatio: 1,
  },
  name: {
    padding: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
  price: {
    padding: 5,
    fontSize: 14,
    color: "green",
  },
});

export default Product;
