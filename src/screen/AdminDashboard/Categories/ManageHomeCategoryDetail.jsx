import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useToast } from "../../../lib/ToastService";
import { useNavigation } from "@react-navigation/native";
import { apis } from "../../../apis";
import colors from "../../../styles/colors";

const categoryGroup = [
  { name: "Women's & Girls' Fashion", icon: "dress" },
  { name: "Men's & Boys' Fashion", icon: "tshirt-crew" },
  { name: "Electronic Accessories", icon: "headphones" },
  { name: "TV & Home Appliances", icon: "television" },
  { name: "Electronics Device", icon: "laptop" },
  { name: "Mother & Baby", icon: "baby-bottle-outline" },
  { name: "Automotive & Motorbike", icon: "car" },
  { name: "Sports & Outdoors", icon: "basketball" },
  { name: "Home & Lifestyle", icon: "sofa" },
  { name: "Groceries", icon: "shopping" },
  { name: "Health & Beauty", icon: "lipstick" },
  { name: "Watches, Bags, Jewellery", icon: "watch" },
];


const ManageHomeCategoryDetail = () => {
  const [selectedCategory, setSelectedCategory] = useState(categoryGroup[0].name);

  const [subCategories, setSubCategories] = useState([]);
  const toast = useToast();
  const navigation = useNavigation();

  useEffect(() => {
    fetchSubCategories();
  }, []);

  async function fetchSubCategories() {
    try {
      const { data } = await apis.get("/categories?type=sub_categories");
      if (data.data) {
        setSubCategories(data.data);
      }
    } catch (ex) {
      toast.error("Failed to fetch popular categories");
    }
  }


  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem(selectedCategory === item.name)}
                      onPress={() => setSelectedCategory(item.name)}>
      <Icon name={item.icon} size={20} color={selectedCategory === item.name
        ? colors.primary : colors["gray-10"]} />
      <Text style={styles.categoryText(selectedCategory === item.name)}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <FlatList
          data={categoryGroup}
          renderItem={renderCategory}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.categoryList}
        />
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.mainTitle}>{selectedCategory}</Text>
        <ScrollView contentContainerStyle={styles.subCategoryList}>
          {subCategories.map((item, index) => (
            <View key={index} style={styles.subCategoryItem}>
              <View
                style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={styles.subCategoryText}>{item.name}</Text>
                <Icon style={styles.chevronIcon} name="chevron-down" size={18} color={colors["gray-18"]} />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#f7f9ff",
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  categoryList: {
    paddingTop: 20,
  },
  categoryItem: (isActive) => ({
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    paddingLeft: 20,
    backgroundColor: isActive ? "rgba(103,80,164,0.30)" : "#f3f3f3",
    // borderBottomColor: "#ddd",
    // borderBottomWidth: 1,
  }),
  categoryText: (isActive) => ({
    fontSize: 12,
    color: isActive ? colors.primary : colors["gray-10"],
    fontWeight: isActive ? "600" : "400",
    textAlign: "center",
  }),
  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors["gray-20"],
  },
  subCategoryList: {},
  subCategoryItem: {
    paddingVertical: 16,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    alignItems: "center",
    borderBottomColor: colors["gray-4"],
    borderBottomWidth: 1,
  },
  subCategoryText: {
    fontSize: 14,
    color: "#333",
  },
  chevronIcon: {
    paddingLeft: 20,
    paddingRight: 14,
    paddingVertical: 10,
    borderLeftColor: colors["gray-4"],
    borderLeftWidth: 1,
  },
});


export default ManageHomeCategoryDetail;
