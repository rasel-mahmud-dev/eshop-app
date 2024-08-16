import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Alert, RefreshControl, findNodeHandle } from "react-native";
import Header from "./Header";
import Category from "./Category";
import Product from "./Product";
import { apis } from "../apis";
import catchAxiosError from "../utils/catchAxiosError";
import { useToast } from "../lib/ToastService";
import Loader from "../components/Loader/Loader";
import { useAuthStore } from "../store";
import HeroSlider from "../components/Sliders/HeroSlider";
import HomeCategories from "../components/HomeScreen/HomeCategories";
import { useNavigation } from "@react-navigation/native";
import HomeProducts from "../components/HomeScreen/HomeProducts";

const HomePage = () => {

  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { auth } = useAuthStore();

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

  const [isSticky, setIsSticky] = useState(false);
  const stickyHeaderRef = useRef(null);
  const scrollViewRef = useRef(null);
  const stickyHeaderPositionRef= useRef(0)

  useEffect(() => {
    if (stickyHeaderRef.current && scrollViewRef.current) {
      stickyHeaderRef.current.measureLayout(
        findNodeHandle(scrollViewRef.current),
        (x, y) => stickyHeaderPositionRef.current = y
      );
    }
  }, []);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY >= stickyHeaderPositionRef.current && !isSticky) {
      setIsSticky(true);
    } else if (offsetY < stickyHeaderPositionRef.current && isSticky) {
      setIsSticky(false);
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      stickyHeaderIndices={[5]}
      scrollEnabled={true}
      style={styles.container}
      scrollEventThrottle={16}
      onScroll={handleScroll}
      refreshControl={
        <RefreshControl
          progressBackgroundColor={"rgba(111,169,218,0.98)"}
          progressColor={"green"}
          colors={["#5851DB", "#C13584"]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
      <Header auth={auth} />
      <Category />

      <Text>{auth?.email}</Text>

      <HeroSlider />
      <HomeCategories navigation={navigation} />
      {loading && <Loader />}


      <View ref={stickyHeaderRef}
            style={{ backgroundColor: "red", padding: 10 }}>
        <Text>BBBBBBBBB</Text>
      </View>
      <HomeProducts products={products} navigation={navigation} />


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#f5f5f5',
  },

});

export default HomePage;
