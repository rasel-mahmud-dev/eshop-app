import React, { useEffect, useState } from "react";

import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
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
      const { data } = await apis.get("/categories");
      if (data.data) {
        setCategories(data.data);
      }
    } catch (ex) {
      toast.error("Failed to fetch popular categories");
    }
  }

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
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
        data={categories.slice(0, 6)}
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
  },
  showMoreButton: {
    padding: 5,
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  showMoreText: {
    fontSize: 14,
    color: "#1E90FF",
  },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors["white"],
  },
  image: {
    width: "100%",
    height: 80,
    resizeMode: "cover",
  },
  title: {
    padding: 10,
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    color: colors["gray-14"]
  },
});

export default HomeCategories;
