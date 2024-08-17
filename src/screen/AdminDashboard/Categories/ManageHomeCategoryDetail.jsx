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
import BottomSheet from "../../../components/BottomSheet/BottomSheet";
import useReducer from "../../../hooks/useReducer";
import AddCategory from "./AddCategory2";
import RsButton from "../../../components/RsButton/RsButton";
import EvilIcons from "react-native-vector-icons/EvilIcons";

const categoryGroupIcons = {
  "Women's & Girls' Fashion": "chess-bishop",
  "Men's & Boys' Fashion": "tshirt-crew",
  "Electronic Accessories": "headphones",
  "TV & Home Appliances": "television",
  "Electronics Device": "laptop",
  "Mother & Baby": "baby-bottle-outline",
  "Automotive & Motorbike": "car",
  "Sports & Outdoors": "basketball",
  "Home & Lifestyle": "sofa",
  "Groceries": "shopping",
  "Health & Beauty": "lipstick",
  "Watches, Bags, Jewellery": "watch",
};

const ManageHomeCategoryDetail = () => {

  const [selectedRootCategory, setSelectedRootCategory] = useState(null);
  const [selSubCategory, setSeSubCategory] = useState(null);

  const [subCategories, setSubCategories] = useState({});

  const [categoryGroup, setCategoryGroup] = useState([{
    name: "Create",
    icon: "create",
    id: "new",
  }]);
  const [categories, setCategories] = useState([]);

  const toast = useToast();
  const navigation = useNavigation();

  useEffect(() => {
    fetchCategoryGroup();
  }, []);

  async function fetchSubCategories(parentId) {
    try {
      const { data } = await apis.get(`/categories/filter?type=sub_category&parent_id=${parentId}`);
      if (data.data) {
        setSubCategories(prevState => ({ ...prevState, [parentId]: data.data }));
      }
    } catch (ex) {
      toast.error("Failed to fetch popular categories");
    }
  }

  async function fetchCategories(parentId) {
    try {
      console.log(parentId, "parentId");
      const { data } = await apis.get(`/categories/filter?type=category&parent_id=${parentId}`);
      setCategories(data?.data || []);
    } catch (ex) {
      toast.error("Failed to fetch popular categories");
    }
  }

  async function fetchCategoryGroup() {
    try {
      const { data } = await apis.get("/categories/filter?type=category_group");
      if (data.data) {
        let items = data.data;
        items = items.map(el => {
          const iconName = categoryGroupIcons?.[el?.name];
          return {
            ...el,
            icon: iconName,
          };
        });
        items.unshift({
          name: "Create",
          icon: "create",
          id: "new",
        });
        setCategoryGroup(items);
        const catDetail = items[0];
        if (catDetail?.id) {
          setSelectedRootCategory(catDetail);
          fetchSubCategories(catDetail?.id);
        }
      }
    } catch (ex) {
      toast.error("Failed to fetch category_group.");
    }
  }

  function handleSelectCategory(type, value) {

    if (type === "category_group") {
      setSelectedRootCategory(value);
      if (value.id === "new") {
        setEditUpdateState({
          isCreateUpdate: true,
          type: "category_group",
          initData: {
            parentId: "",
            type: "category_group",
          },
        });
      } else {
        if (value?.id) {
          fetchSubCategories(value?.id);
        }
      }
    } else if (type === "sub_category") {
      if (value.id === "new") {
        setEditUpdateState({
          initData: {
            parentId: selectedRootCategory.id,
            type: "sub_category",
          },
          isCreateUpdate: true,
          type: "sub_category",
        });
      } else {
        setSeSubCategory(prev => {
          let upd = prev?.id === value.id ? null : value;
          if (upd) {
            fetchCategories(upd?.id);
          }
          return upd;
        });
      }
    } else if (type === "category" && value.id === "new") {
      setEditUpdateState({
        initData: {
          parentId: selSubCategory.id,
          type: "category",
        },
        isCreateUpdate: true,
        type: "category",
      });
    }
  }

  const [editUpdateState, setEditUpdateState] = useReducer({
    isCreateUpdate: false,
    initData: {},
    type: "category_group",
  });

  function handleCloseBottomSheet(state = {}) {
    if (state?.type?.value === "category_group") {
      fetchCategoryGroup();
    }
    const parentId = state?.parentId?.value;
    if (state?.type?.value === "category" && parentId) {
      fetchCategories(parentId);
    }

    setEditUpdateState({
      isCreateUpdate: false,
      type: "category_group",
    });
  }

  function handleDeleteCategory() {
    toast.success("Not implemented.");
  }

  function getSubCategories(obj) {
    if (selectedRootCategory?.id === "new") return [];
    const items = obj?.[selectedRootCategory?.id] || [];
    return [
      { name: "Create Sub Categories", icon: "create", id: "new" },
      ...items,
    ];
  }

  const isOpenBottomSheet = editUpdateState.isCreateUpdate;

  return (
    <>
      {selectedRootCategory && selectedRootCategory?.id !== "new" && (
        <RsButton
          onPress={handleDeleteCategory}
          loginButton={{
            paddingVertical: 0,
            paddingHorizontal: 0,
            justifyContent: "center",
            alignItems: "center",
          }} style={styles.floatingDeleteBtn}>
          <EvilIcons name="trash" size={25} color="white" />
        </RsButton>
      )}

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
                                  onPress={() => handleSelectCategory("category_group", item)}>
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
              {getSubCategories(subCategories).map((item, index) => (
                <View key={index} style={styles.subCategoryItem}>
                  <View style={{ width: "100%" }}>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}>

                      {item.id === "new" ? (
                        <TouchableOpacity onPress={() => handleSelectCategory("sub_category", item)}>
                          <Text style={{ fontWeight: "600", fontSize: 14, color: colors.primary }}>{item.name}</Text>
                        </TouchableOpacity>
                      ) : (
                        <>
                          <Text style={styles.subCategoryText}>{item.name}</Text>
                          <TouchableOpacity onPress={() => handleSelectCategory("sub_category", item)}>
                            <Icon style={styles.chevronIcon} name="chevron-down" size={18} color={colors["gray-18"]} />
                          </TouchableOpacity>
                        </>
                      )}
                    </View>


                    {/* drop down absolute */}
                    {selSubCategory?.id === item.id && <View style={styles.childCategories}>


                      <RsButton
                        loginButton={{ paddingHorizontal: 0 }}
                        style={{ marginVertical: 10 }}
                        textStyle={{ fontSize: 10 }}
                        onPress={() => handleSelectCategory("category", { id: "new", name: "Create" })}>
                        Create One
                      </RsButton>

                      {!categories?.length ? (
                        <Text style={{ color: colors["gray-8"], fontSize: 16, fontWeight: "500" }}>There is no
                          category..</Text>
                      ) : null}


                      <View style={styles.childCategoriesGrid}>
                        {categories?.map(cat => (
                          <View style={styles.childCategoryItem}>
                            {cat?.logo && <Image style={styles.childCategoryImg} source={{ uri: cat?.logo }} />}
                            <Text style={styles.childCategoryText}>{cat.name}</Text>
                          </View>
                        ))}
                      </View>

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

      <BottomSheet height={500} isOpen={isOpenBottomSheet} onClose={() => handleCloseBottomSheet()}>
        <AddCategory
          onSuccess={(state) => handleCloseBottomSheet(state)}
          onClose={() => {
          }}
          initData={editUpdateState.initData}
        />
      </BottomSheet>
    </>
  );
};


const styles = StyleSheet.create({
  floatingDeleteBtn: {
    position: "absolute",
    bottom: 50,
    right: 30,
    zIndex: 10,
    width: 40,
    height: 40,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "red",
    shadowRadius: 10,
    elevation: 10,
  },
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
    padding: 5,
  },
  childCategoriesGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Ensure equal spacing between items
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
