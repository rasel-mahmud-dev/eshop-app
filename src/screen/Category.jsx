import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const categories = [
  { name: "Mobiles", image: "https://rukminim2.flixcart.com/fk-p-flap/200/200/image/44e10b16e649b691.jpg?q=100" },
  { name: "Fashion", image: "https://rukminim2.flixcart.com/fk-p-flap/200/200/image/9d4e9c605fc1d2d3.jpg?q=100" },
  { name: "Laptops", image: "https://rukminim2.flixcart.com/fk-p-flap/200/200/image/4da1d0d19350cc84.jpg?q=100" },
  { name: "Electronics", image: "https://rukminim2.flixcart.com/fk-p-flap/200/200/image/717b5077a5e25324.jpg?q=100" },
  { name: "Grocery", image: "https://rukminim2.flixcart.com/fk-p-flap/200/200/image/25f400c36bc3487d.jpg?q=100" },
  { name: "Furniture", image: "https://rukminim2.flixcart.com/fk-p-flap/200/200/image/7a5e96c10ada8a56.jpg?q=100" },
];

const Category = () => {
  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <View key={category.name} style={styles.category}>
          <Image source={{ uri: category.image }} style={styles.image} />
          <Text style={styles.text}>{category.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  category: {
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: "700",
    color: "#5e5e5e",
  },
});

export default Category;
