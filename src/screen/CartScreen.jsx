import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import RsButton from "../components/RsButton/RsButton";
import Entypo from "react-native-vector-icons/Entypo";
import { useAuthStore } from "../store";
import cartsAction from "../store/actions/cartsAction";

const CartPage = ({ navigation }) => {


  const { setCarts, cartItems } = useAuthStore();

  useEffect(() => {
    cartsAction.fetchCarts().then(items => {
      setCarts(items);
    });
  }, []);

  const handleIncrement = (id) => {
    // setCartItems(prevItems =>
    //   prevItems.map(item =>
    //     item.id === id && item.quantity < item.stock
    //       ? { ...item, quantity: item.quantity + 1 }
    //       : item,
    //   ),
    // );
  };

  const handleDecrement = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  return (
    <View style={styles.container}>

      <View style={{ padding: 15, flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-small-left" style={{ color: "#1c1c1c", justifyContent: "center", fontSize: 25 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1c1c1c" }}>My Cart</Text>
      </View>

      <ScrollView style={styles.containerScroll}>
        {cartItems?.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemName}>{item.title}</Text>
              <Text style={styles.cartItemStock}>Only {item?.stock ?? 1} item(s) in stock</Text>
              <Text style={styles.cartItemPrice}>৳ {item.price}</Text>
            </View>
            <View style={styles.cartItemActions}>
              <RsButton style={styles.actionBtn} loginButton={{ paddingVertical: 0, paddingHorizontal: 1 }}
                        onPress={() => handleIncrement(item.id)}>
                <Icon name="add" size={16} color="#fff" />
              </RsButton>
              <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
              <RsButton style={styles.actionBtn} loginButton={{ paddingVertical: 0, paddingHorizontal: 1 }}
                        onPress={() => handleDecrement(item.id)}>
                <Icon name="remove" size={16} color="#fff" />
              </RsButton>
            </View>
          </View>
        ))}

      </ScrollView>
      <View style={styles.checkoutContainer}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#2a2a2a" }}>Total: 1231.23</Text>
        <RsButton loginButton={{ paddingHorizontal: 50 }} onPress={() => navigation.navigate("Checkout", { cartItems })}
                  style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Check Out</Text>
        </RsButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  containerScroll: {},
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cartItem: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 5,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 5,
  },
  cartItemDetails: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  cartItemName: {
    fontSize: 16,
    color: "#333",
  },
  cartItemStock: {
    color: "red",
    marginTop: 5,
  },
  cartItemPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  actionBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    height: 30,
    width: 30,
  },
  cartItemActions: {
    justifyContent: "center",
    alignItems: "center",
  },
  cartItemQuantity: {
    fontSize: 16,
    marginVertical: 10,
    color: "#333",
  },
  checkoutContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  checkoutButton: {
    marginTop: 0,
    backgroundColor: "#f36f3e",
    padding: 2,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default CartPage;
