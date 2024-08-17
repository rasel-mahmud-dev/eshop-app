import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useToast } from "../../../lib/ToastService";
import { useNavigation } from "@react-navigation/native";
import { apis } from "../../../apis";
import colors from "../../../styles/colors";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const categoryGroup = [
  { name: "Women's & Girls' Fashion", icon: "chess-bishop" },
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

  const [selectedRootCategory, setSelectedRootCategory] = useState(null);
  const [selSubCategory, setSeSubCategory] = useState(null);

  const [subCategories, setSubCategories] = useState([]);
  const [categoryGroup, setCategoryGroup] = useState([]);

  const toast = useToast();
  const navigation = useNavigation();

  useEffect(() => {
    fetchSubCategories();
    fetchCategoryGroup();
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

  async function fetchCategoryGroup() {
    try {
      const { data } = await apis.get("/categories/filter?type=category_group");
      if (data.data) {
        setCategoryGroup(data.data);
        setSelectedRootCategory(data.data[0]);
      }
    } catch (ex) {
      toast.error("Failed to fetch category_group.");
    }
  }

  function handleSelectCategory(type, value) {
    if (type === "root") {
      setSelectedRootCategory(value);
    } else if (type === "subCategory") {
      setSeSubCategory(prev => prev?.id === value.id ? null : value);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-small-left" style={{ color: "#1c1c1c", justifyContent: "center", fontSize: 25 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#1c1c1c" }}>{selectedRootCategory?.name}</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="shoppingcart" style={{ color: "#1c1c1c", justifyContent: "center", fontSize: 18 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="search1" style={{ color: "#1c1c1c", justifyContent: "center", fontSize: 19 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="ellipsis-vertical" style={{ color: "#1c1c1c", justifyContent: "center", fontSize: 18 }} />
          </TouchableOpacity>

        </View>
      </View>

      <View style={styles.containerWrapper}>
        <View style={styles.sidebar}>
          <FlatList
            data={categoryGroup}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.categoryItem(selectedRootCategory?.name === item.name)}
                                onPress={() => handleSelectCategory("root", item)}>
                <Icon name={item.icon} size={20} color={selectedRootCategory?.name === item.name
                  ? colors.primary : colors["gray-10"]} />
                <Text style={styles.categoryText(selectedRootCategory?.name === item.name)}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.categoryList}
          />
        </View>

        <View style={styles.mainContent}>
          <ScrollView contentContainerStyle={styles.subCategoryList}>
            {subCategories.map((item, index) => (
              <View key={index} style={styles.subCategoryItem}>
                <View style={{ width: "100%" }}>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <Text style={styles.subCategoryText}>{item.name}</Text>
                    <TouchableOpacity onPress={() => handleSelectCategory("subCategory", item)}>
                      <Icon style={styles.chevronIcon} name="chevron-down" size={18} color={colors["gray-18"]} />
                    </TouchableOpacity>
                  </View>

                  {/* drop down absolute */}
                  {selSubCategory?.id === item.id && <View style={styles.childCategories}>

                    {subCategories?.map(cat => (
                      <View style={styles.childCategoryItem}>
                        <Image style={styles.childCategoryImg} source={{ uri: cat?.logo }} />
                        <Text style={styles.childCategoryText}>{cat.name}</Text>
                      </View>
                    ))}


                    {/*<FlatList scrollEnabled={false} data={subCategories}*/}
                    {/*          renderItem={({ item }) => (*/}
                    {/*            <View style={styles.childCategoryItem}>*/}
                    {/*              <Text>{item.name}</Text>*/}
                    {/*            </View>*/}
                    {/*          )} />*/}

                  </View>}

                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    shadowColor: "rgba(42,42,42,0.68)",
    elevation: 10,
    marginBottom: 1,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 15,
  },
  containerWrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  sidebar: {
    width: "25%",
    backgroundColor: "#f7f9ff",
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  categoryList: {},
  categoryItem: (isActive) => ({
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    padding: 8,
    backgroundColor: isActive ? "rgba(103,80,164,0.30)" : "#f3f3f3",
  }),
  categoryText: (isActive) => ({
    fontSize: 11,
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
  childCategories: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Ensure equal spacing between items
    padding: 10,
  },
  childCategoryItem: {
    width: "48%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  childCategoryText: {
    color: colors["gray-16"],
    fontSize: 12,
    fontWeight: "300",
  },
  childCategoryImg: {
    height: 40,
    aspectRatio: 1,
  },
});


export default ManageHomeCategoryDetail;
