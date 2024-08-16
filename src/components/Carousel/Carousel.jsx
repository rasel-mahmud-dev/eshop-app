import React, { useState, useRef, useEffect } from "react";
import { View, Animated,  Dimensions, StyleSheet, TouchableOpacity, Image } from "react-native";
import Pagination from "../Pagination/Pagination";

const { width } = Dimensions.get("window");

const initialData = [
  {
    id: "1",
    title: "A",
    image: "https://img.lazcdn.com/us/domino/1819037e-45da-43c4-ac50-99fcb5781f69_BD-1976-688.jpg_1200x1200q80.jpg_.webp",
  },
  {
    id: "2",
    title: "B",
    image: "https://img.lazcdn.com/us/domino/de060edb-2b2c-4827-8fbc-040d2936cbf9_BD-1976-688.jpg_1200x1200q80.jpg_.webp",
  },
  {
    id: "3",
    title: "C",
    description: "Special Deal Just for You",
    image: "https://img.lazcdn.com/us/domino/622e206e-299a-410a-b68a-18f45fffee96_BD-1976-688.jpg_1200x1200q80.jpg_.webp",
  },
  {
    id: "4",
    title: "Buy 1 Get 1 Free",
    description: "Special Deal Just for You",
    image: "https://img.lazcdn.com/us/domino/dde95fe1-43a8-4978-ad4b-6f980bef4611_BD-1976-688.jpg_1200x1200q80.jpg_.webp",
  },
  {
    id: "5",
    title: "Buy 1 Get 1 Free",
    description: "Special Deal Just for You",
    image: "https://img.lazcdn.com/us/domino/c819d566-cb43-4c21-9b57-e93651c8b2f5_BD-1976-688.jpg_1200x1200q80.jpg_.webp",
  },
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const [items, setItems] = useState(initialData);
  const flatListRef = useRef(null);
  const autoScrollRef = useRef(null);

  const startAutoScroll = () => {
    autoScrollRef.current = setInterval(() => {
      const nextIndex = (activeIndex + 1) % items.length;
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 2000);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll(); // Clear interval on component unmount
  }, [activeIndex, items]);

  const RenderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.itemContainer, { width }]}
    >
      <View style={styles.imageWrapper}>

        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      {/*<Text style={styles.title}>{item.title}</Text>*/}
      {/*<Text style={styles.description}>{item.description}</Text>*/}
    </TouchableOpacity>
  );

  const handleDotPress = (index) => {
    setScrolling(true);
    flatListRef.current.scrollToIndex({ index, animated: true });
    setActiveIndex(index);
  };

  const handleScroll = (event) => {
    if (!scrolling) {
      const offsetX = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(offsetX / width);
      setActiveIndex(newIndex);
    }
  };

  const handleScrollEnd = () => {
    setScrolling(false);
  };

  const loadMoreItems = () => {
    const newItems = initialData.map((item, index) => ({
      ...item,
      id: `${item.id}-${index + items.length}`,
    }));
    setItems((prevItems) => [...prevItems, ...newItems]);
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        ref={flatListRef}
        style={{ flexGrow: 0 }}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleScrollEnd}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={RenderItem}
      />

      <Pagination
        style={styles.pagination}
        total={initialData.length}
        paginationIndex={activeIndex % initialData.length}
        onPress={handleDotPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    top: -25,

  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    padding: 10,
  },
  imageWrapper: {
    width: "100%",
    height: 130,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    marginTop: 5,
    fontSize: 14,
    color: "gray",
  },
});

export default Carousel;
