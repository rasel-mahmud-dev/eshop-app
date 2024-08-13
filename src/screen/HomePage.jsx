import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Alert, RefreshControl } from "react-native";
import Header from "./Header";
import Category from "./Category";
import Product from "./Product";
import { apis } from "../apis";
import catchAxiosError from "../utils/catchAxiosError";
import { useToast } from "../lib/ToastService";
import Loader from "../components/Loader/Loader";

const HomePage = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { error } = useToast();

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
    <ScrollView style={styles.container} refreshControl={
      <RefreshControl
        progressBackgroundColor={"rgba(111,169,218,0.98)"}
        progressColor={"green"}
        colors={["#5851DB", "#C13584"]}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>
      <Header />
      <Category />


      <View style={styles.productContainer}>
        {loading && <Loader />}

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
