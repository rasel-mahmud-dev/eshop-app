import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image, Alert, RefreshControl } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useToast } from "../../../lib/ToastService";
import { apis } from "../../../apis";
import catchAxiosError from "../../../utils/catchAxiosError";
import Loader from "../../../components/Loader/Loader";
import RsButton from "../../../components/RsButton/RsButton";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import subStr from "../../../utils/subStr";

const ProductList = () => {
  const { error, success } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  async function fetchProducts() {
    try {
      setLoading(true);
      const res = await apis.get("/products");
      setProducts(res?.data?.data || []);
    } catch (ex) {
      error(catchAxiosError(ex));
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
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

      <View style={{ flexDirection: "column", flex: 1 }}>

        <View style={styles.itemDetails}>
          <Text style={styles.productName}>{item.title}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
          <Text style={styles.productDescription}>{subStr(item.description, 150)}</Text>
        </View>

        <View style={styles.actions}>
          <RsButton loginButton={styles.loginButton}
                    onPress={() => navigation.navigate("AdminDashboard::UpdateProduct", { productId: item.id })}
                    style={styles.actionButton}>
            <Icon name="pencil-outline" size={14} color="#fff" />
            <Text style={styles.actionText}>Edit</Text>
          </RsButton>
          <RsButton loginButton={styles.loginButton} onPress={() => handleDelete(item.id)} style={styles.actionButton}>
            <Icon name="trash-outline" size={14} color="#fff" />
            <Text style={styles.actionText}>Delete</Text>
          </RsButton>
        </View>
      </View>
    </View>
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      fetchProducts();
    } catch (ex) {
      Alert.alert(catchAxiosError(ex));
    } finally {
      setRefreshing(false);
    }
  };
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

            refreshControl={
              <RefreshControl
                progressBackgroundColor={"rgba(111,169,218,0.98)"}
                progressColor={"green"}
                colors={["#5851DB", "#C13584"]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
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
    flex: 1,
    paddingVertical: 20,
    flexDirection: "row",
    width: "100%",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",

  },
  itemImageContainer: {
    marginRight: 10,
  },
  productImage: {
    flex: 1,
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    color: "#555",
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
    writingDirection: "auto",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  loginButton: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  actionButton: {
    marginTop: 10,
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
