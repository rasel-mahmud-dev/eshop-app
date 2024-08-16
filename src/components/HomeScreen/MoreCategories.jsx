import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useToast } from "../../lib/ToastService";
import { apis } from "../../apis";
import Entypo from "react-native-vector-icons/Entypo";

const MoreCategories = ({ navigation }) => {

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-small-left" style={{ color: "#1c1c1c", justifyContent: "center", fontSize: 25 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1c1c1c" }}>Just for you</Text>

      </View>
      <FlatList
        numColumns={2}
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
    columnGap: 16
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
  },
  backButton: {
    padding: 5,
  },
  backText: {
    fontSize: 14,
    color: "#1E90FF",
  },
  card: {
    width: "48%",
    margin: "1%",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 80,
    resizeMode: "cover",
  },
  title: {
    padding: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MoreCategories;
