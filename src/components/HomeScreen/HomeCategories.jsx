import React, { useEffect, useState } from "react";

import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import { useToast } from "../../lib/ToastService";
import { apis } from "../../apis";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../styles/colors";

const HomeCategories = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const toast = useToast();


  useEffect(() => {
    fetchPopularCategories();
  }, []);

  async function fetchPopularCategories() {
    try {
      const { data } = await apis.get("/categories?type=popular");
      if (data.data) {
        setCategories(data.data);
      }
    } catch (ex) {
      toast.error("Failed to fetch popular categories");
    }
  }

  const width = Dimensions.get("window").width;
  const itemWidth = width / 3;
  const renderCategory = ({ item }) => (
    <View key={item.id} style={{width: itemWidth}}>
      <TouchableOpacity style={{...styles.card,}}>
        <Image source={{ uri: item.logo }} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Categories</Text>
        <TouchableOpacity onPress={() => navigation.navigate("MoreCategories")} style={styles.showMoreButton}>
          <Text style={styles.showMoreText}>Show More</Text>
          <Icon name="chevron-right" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={3}
        style={{ marginHorizontal: 2 }}
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  headerContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "rgba(66,69,72,0.98)"
  },
  showMoreButton: {
    padding: 5,
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  showMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors["primary-500"],
  },
  icon: {
    color: colors["primary-500"]
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: 6,
    margin: 6,
    padding: 10,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "rgba(111,169,218,0.07)",
  },
  image: {
    width: 70,
    height: 70,
    backgroundColor: "rgba(84,109,129,0.21)",
    borderRadius: 80,
    resizeMode: "contain"
  },
  title: {
    paddingTop: 10,
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    color: colors["gray-16"]
  },
});

export default HomeCategories;
