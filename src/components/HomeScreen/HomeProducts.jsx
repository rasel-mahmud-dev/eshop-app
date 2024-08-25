import React, { useEffect, useRef, useState } from "react";
import { Animated, TouchableOpacity, View, StyleSheet, Image, Text, Dimensions } from "react-native";
import subStr from "../../utils/subStr"
import { useNavigation } from "@react-navigation/native";

const HomeProducts = ({ onTabChange, products, tab }) => {
  const scrollViewRef = useRef(null);
  const prevScrollIndexRef = useRef(0);

  const navigation = useNavigation()

  const width = Dimensions.get("window").width;
  const itemWidth = width / 2;


  // Example navigation from a product listing page
  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const renderProduct2 = ({ item = 0 }) => (
    <TouchableOpacity style={styles.card} onPress={()=> handleProductPress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{subStr(item.title, 35)}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const views = [
    {
      el: (products) => (
        <View style={{ width: itemWidth }}>
          {products.map(item => renderProduct2({ item }))}
        </View>
      ),
    },
    {
      el: (products) => (
        <View style={{ width: itemWidth }}>
          {products.map(item => renderProduct2({ item }))}
        </View>
      ),
    },
    {
      el: (products) => (
        <View style={{ width: itemWidth }}>
          {products.map(item => renderProduct2({ item }))}
        </View>
      ),
    },
    {
      el: (products) => (
        <View style={{ width: itemWidth }}>
          {products.map(item => renderProduct2({ item }))}
        </View>
      ),
    },
  ];

  const renderProduct = ({ item, products }) => {
    return <View>{item?.el(products)}</View>;
    return null;
  };

  const [scrolling, setScrolling] = useState(false);


  const handleScroll = (event) => {
    if (!scrolling && !prevScrollIndexRef.current === tab) {
      const offsetX = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(offsetX / width);
      onTabChange(newIndex);
      prevScrollIndexRef.current = newIndex;
    }
  };

  const handleScrollEnd = () => {
    setScrolling(false);
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      if (prevScrollIndexRef.current === tab) return;
      prevScrollIndexRef.current = tab;
      let index = 0;
      if (tab !== 0) {
        index = tab + 1;
      }
      scrollViewRef.current.scrollToIndex({
        index,
        animated: true,
      });
    }
  }, [tab]);

  return (
    <>
      <Animated.FlatList
        style={{ flexGrow: 0 }}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleScrollEnd}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id}
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        data={views}
        renderItem={({ item }) => renderProduct({ item, products })}
        onScroll={handleScroll}
        snapToInterval={width}
        decelerationRate="fast"
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 6,
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    maxHeight: 200,
  },
  image: {
    height: "100%",
    maxHeight: 100,
    resizeMode: "contain",
  },
  details: {
    padding: 5,
    // borderTopWidth: 1,
    // borderTopColor: "#eee",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 14,
    color: "#1E90FF",
    marginTop: 5,
  },
});

export default HomeProducts;
