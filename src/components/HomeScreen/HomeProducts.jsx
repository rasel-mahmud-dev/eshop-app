import React, { useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, View, StyleSheet, Image, Text, Dimensions } from "react-native";
import RsButton from "../RsButton/RsButton";

const HomeProducts = ({ onTabChange, products, tab }) => {
  const scrollViewRef = useRef(null);
  const scrollDragging = useRef(false);
  const [userScrolled, setUserScrolled] = useState(false);

  const width = Dimensions.get("window").width;
  const itemWidth = width / 2;
  const renderProduct2 = ({ item = 0 }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const views = [
    {
      el: (
        <View style={{ width: itemWidth }}>
          <Text>AAAAAAA</Text>
          {products.map(item => renderProduct2({ item }))}
        </View>
      ),
    },
    {
      el: (
        <View style={{ width: itemWidth }}>
          <Text>BBBBBB</Text>
          {products.map(item => renderProduct2({ item }))}
        </View>
      ),
    },
    {
      el: (
        <View style={{ width: itemWidth }}>
          <Text>CCCCCCCC</Text>
          {products.map(item => renderProduct2({ item }))}
        </View>
      ),
    },
    {
      el: (
        <View style={{ width: itemWidth }}>
          <Text>DDDDDDD</Text>
          {products.map(item => renderProduct2({ item }))}
        </View>
      ),
    },
  ];

  const renderProduct = ({ item }) => {
    return <View>{item.el}</View>;
  };


  const handleScroll = (event) => {
    if (!userScrolled) {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const newTab = Math.round(contentOffsetX / width);
      onTabChange(newTab);
    }
  };

  const handleScrollBeginDrag = () => {
    scrollDragging.current = true;
    setUserScrolled(true);
  };

  const handleScrollEndDrag = () => {
    scrollDragging.current = false;
    setUserScrolled(false);
  };

  useEffect(() => {
    if (scrollViewRef.current && !scrollDragging.current) {
      scrollViewRef.current.scrollToIndex({
        index: tab,
        animated: true,
      });
    }
  }, [tab]);

  return (
    <>
      <RsButton onPress={() => {
        scrollViewRef.current.scrollToIndex({
          index: 2,
          animated: true,
        });
      }}>
        CHANGE
      </RsButton>
      <FlatList
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        data={views}
        renderItem={renderProduct}
        onScroll={handleScroll}
        snapToInterval={width}
        decelerationRate="fast"
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 6,
    flex: 1,
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  details: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  title: {
    fontSize: 16,
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
