import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView, TouchableOpacity, View, StyleSheet, Text, Image, RefreshControl } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import BottomSheet from "../../../components/BottomSheet/BottomSheet";
import colors from "../../../styles/colors";
import { apis } from "../../../apis";
import { useToast } from "../../../lib/ToastService";
import useReducer from "../../../hooks/useReducer";
import SelectRooCategories from "./SelectRooCategories";

export async function udpateCategoryConfig(config) {
  try {
    const { data } = await apis.post(`/categories/category-config`, config);
    return data
  } catch (ex) {
    throw ex;
  }
}

const ManageHomeCategoryDetail = () => {

  const [selectedRootCategory, setSelectedRootCategory] = useState(null);
  const [selSubCategory, setSeSubCategory] = useState(null);

  const [mobileCategoryMapping, setMobileCategoryMapping] = useState(null);
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useReducer({
    isOpen: false,
    action: "",
  });

  const [subCategories, setSubCategories] = useState({});
  const [categoryGroup, setCategoryGroup] = useState([]);
  const [categories, setCategories] = useState([]);

  const toast = useToast();
  const navigation = useNavigation();

  useEffect(() => {
    fetchCategoryConfig();
  }, []);

  async function fetchCategories() {
    try {
      const { data } = await apis.get(`/categories/filter`);
      setCategories(data?.data || []);
    } catch (ex) {
      toast.error("Failed to fetch popular categories");
    }
  }

  async function fetchCategoryConfig() {
    try {
      const { data } = await apis.get(`/categories/category-config`);
      setMobileCategoryMapping(data?.mobile_category_mapping || []);
    } catch (ex) {
      toast.error("Failed to fetch popular categories");
    }
  }

  async function fetchCategoryGroup() {
    try {
      const { data } = await apis.get("/categories/filter?type=category_group");


    } catch (ex) {
      toast.error("Failed to fetch category_group.");
    }
  }

  function handleSelectCategory(type, value) {
    if (type === "root") {

      if (value.id === "select_root") {
        setIsOpenBottomSheet({
          isOpen: true,
          action: "select_root"
        })
      }


    } else if (type === "sub_category") {
      setSeSubCategory(prev => {
        let upd = prev?.id === value.id ? null : value;
        if (upd) {
          fetchCategories(upd?.id);
        }
        return upd;
      });
    }
  }

  function getSubCategories(obj) {
    if (selectedRootCategory?.id === "new") return [];
    return obj?.[selectedRootCategory?.id] || [];
  }


  function handleCloseBottomSheet() {
    setIsOpenBottomSheet({
      isOpen: false,
      action: "select",
    });
  }

  function appendInsert(arr) {
    return [
      {
        name: "Select",
        id: "select_root",
        logo: "https://static-assets-web.flixcart.com/www/linchpin/batman-returns/images/fk-default-image-75ff340b.png?q=90",
      },
      ...(arr ?? []),
    ];
  }

  const sheetOpen = isOpenBottomSheet?.isOpen;
  function onRefresh(){
    fetchCategoryConfig().finally(()=>{
      setR(false)
    })
  }
  const [refreshing, setR] = useState(false)

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
            refreshControl={
              <RefreshControl
                progressBackgroundColor={"rgba(111,169,218,0.98)"}
                progressColor={"green"}
                colors={["#5851DB", "#C13584"]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            data={appendInsert(mobileCategoryMapping)}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.categoryItem(selectedRootCategory?.name === item.name)}
                                onPress={() => handleSelectCategory("root", item)}>
                <Image source={{ uri: item.logo }} style={styles.rootCategoryImage} />
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


      <BottomSheet height={700} isOpen={sheetOpen} onClose={() => handleCloseBottomSheet()}>
        {/*<AddCategory*/}
        {/*  onSuccess={(state) => handleCloseBottomSheet(state)}*/}
        {/*  onClose={() => {*/}
        {/*  }}*/}
        {/*  initData={editUpdateState.initData}*/}
        {/*/>*/}

        <SelectRooCategories
          mobileCategoryMapping={mobileCategoryMapping}
          onSuccess={(state) => handleCloseBottomSheet(state)}
          onClose={() => {
          }}

        />

      </BottomSheet>

    </View>
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

  rootCategoryImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});


export default ManageHomeCategoryDetail;
