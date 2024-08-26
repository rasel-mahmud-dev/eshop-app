import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RsButton from "../components/RsButton/RsButton";
import Entypo from "react-native-vector-icons/Entypo";
import { apis, setAuthorization } from "../apis";
import catchAxiosError from "../utils/catchAxiosError";
import { useToast } from "../lib/ToastService";
import { useAuthStore } from "../store";
import cartAction from "../store/actions/cartsAction";

const ProductDetailScreen = ({ route }) => {
  const { product } = route?.params || {};
  const navigation = useNavigation();
  const { auth, cartItems, setCarts } = useAuthStore();

  const toast = useToast();

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      if (!product?.id) throw new Error("Product not found");
      if (!auth) {
        navigation.navigate("Login");
        return;
      }

      await setAuthorization();
      const { status, data } = await apis.post("/carts/add", {
        productId: product?.id,
        quantity,
      });
      if (status === 201 && data?.data) {
        const result = await cartAction.appendNew(data?.data);
        setCarts(result);
        toast.success("Added to cart");
      }

    } catch (ex) {
      toast.error(catchAxiosError(ex));
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: 15, flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-small-left" style={{ color: "#1c1c1c", justifyContent: "center", fontSize: 25 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1c1c1c" }}>Back</Text>
      </View>

      <ScrollView style={styles.containerScroll}>
        <Image source={{ uri: product?.image }} style={styles.productImage} />

        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product?.title}</Text>
          <Text style={styles.productPrice}>৳ {product?.price}</Text>
          <Text style={styles.productDescription}>{product?.description}</Text>

          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityControls}>
              <RsButton onPress={() => setQuantity(quantity - 1)} style={styles.actionBtn}
                        loginButton={{ paddingVertical: 4, paddingHorizontal: 10 }}>
                -
              </RsButton>
              <Text style={styles.quantityText}>{quantity}</Text>
              <RsButton onPress={() => setQuantity(quantity + 1)} style={styles.actionBtn}
                        loginButton={{ paddingVertical: 4, paddingHorizontal: 10 }}>
                +
              </RsButton>
            </View>
          </View>

          <RsButton style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </RsButton>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  }, containerScroll: {
    paddingVertical: 30,
  },
  productImage: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  actionBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    height: 30,
    width: 30,
  },
  productInfo: {
    padding: 20,
    backgroundColor: "#fff",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f36f3e",
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    color: "#333",
    marginRight: 10,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  quantityButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  addToCartButton: {
    backgroundColor: "#f36f3e",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;
