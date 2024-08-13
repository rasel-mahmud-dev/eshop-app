import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useToast } from "../../../lib/ToastService";
import { apis } from "../../../apis";
import catchAxiosError from "../../../utils/catchAxiosError";
import Loader from "../../../components/Loader/Loader";
import RsButton from "../../../components/RsButton/RsButton";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const ProductList = () => {
  const { error, success } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await apis.get("/products");
        setProducts(res?.data?.data || []);
      } catch (ex) {
        error(catchAxiosError(ex));
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await apis.delete(`/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
      success("Product deleted successfully");
    } catch (ex) {
      error(catchAxiosError(ex));
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
      <View style={styles.actions}>
        <RsButton loginButton={styles.loginButton} onPress={() => onEdit(item)} style={styles.actionButton}>
          <Icon name="pencil-outline" size={14} color="#fff" />
          <Text style={styles.actionText}>Edit</Text>
        </RsButton>
        <RsButton loginButton={styles.loginButton} onPress={() => handleDelete(item.id)} style={styles.actionButton}>
          <Icon name="trash-outline" size={14} color="#fff" />
          <Text style={styles.actionText}>Delete</Text>
        </RsButton>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={{ padding: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{
          padding: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-small-left" style={{ color: "#1c1c1c", justifyContent: "center", fontSize: 25 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1c1c1c" }}>Products</Text>
        </View>
        <View>
          <AntDesign style={{ color: "#4f4f4f" }} name="search1" size={20} />
        </View>
      </View>


      {loading ? (
        <Loader />
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />

          <RsButton loginButton={{ width: "100%" }} onPress={() => navigation.navigate("AdminDashboard::AddProduct")}
                    style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Product</Text>
          </RsButton>

        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 10,
  },
  addButton: {
    marginBottom: 0,
    margin: 0,
    padding: 0,
    backgroundColor: "#1E90FF",
  },
  addButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 10,
  },
  itemImageContainer: {
    marginRight: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#1E90FF",
  },
  productDescription: {
    fontSize: 12,
    color: "#555",
  },
  actions: {
    // flexDirection: "row",
    // alignItems: "center",
  },
  loginButton: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  actionButton: {
    paddingHorizontal: 1,

    // borderRadius: 5,
    // backgroundColor: "#1E90FF",

  },
  actionText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 10,
  },
});

export default ProductList;
