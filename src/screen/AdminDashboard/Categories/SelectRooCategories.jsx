import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, FlatList, Switch, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker"; // Import the image picker
import RsButton from "../../../components/RsButton/RsButton";
import { useCategoryStore } from "../../../store";
import { apis } from "../../../apis";
import colors from "../../../styles/colors";
import CheckBox from "../../../components/CheckBox";
import { udpateCategoryConfig } from "./ManageHomeCategoryDetail";
import { useToast } from "../../../lib/ToastService";
import catchAxiosError from "../../../utils/catchAxiosError";


const SelectRooCategories = ({ onClose, mobileCategoryMapping, onSuccess }) => {
  const { allDbCategories, setAllDbCategories } = useCategoryStore();

  const toast = useToast();

  useEffect(() => {
    if (allDbCategories.length) return;
    apis.get("/categories/filter").then((res) => {
      const data = res?.data?.data;
      if (data) {
        setAllDbCategories(data);
      }
    });
  }, []);

  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (!mobileCategoryMapping?.length) return;
    const items = mobileCategoryMapping?.reduce((acc, curr) => {
      if (!acc.includes(curr.id)) {
        acc.push(curr.id);
      }
      return acc;
    }, []);
    setSelectedItems(items);
  }, [mobileCategoryMapping]);


  async function handleSubmit() {
    try {
      const items = allDbCategories?.filter(el => selectedItems?.includes(el.id));
      const newMenus = [];
      for (let item of items) {
        let old = mobileCategoryMapping[item.id];
        if (old && old.subMenu) {
          item.subMenu = old.subMenu;
        }
        newMenus.push(item);
      }

      await udpateCategoryConfig(newMenus);
      toast.success("Success");
    } catch (ex) {
      toast.error(catchAxiosError(ex));
    }
  }

  function handleChange(id) {

    const updatedState = [...selectedItems];
    let index = updatedState.indexOf(id);
    if (index !== -1) {
      updatedState.splice(index, 1);
    } else {
      updatedState.push(id);
    }
    setSelectedItems(updatedState);
  }

  return (
    <View>
      <View>
        <View
          style={{ paddingVertical: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#212121",
            paddingBottom: 10,
          }}>Categories</Text>

          <RsButton textStyle={{ fontSize: 14 }} style={{ marginTop: 0 }} loginButton={{
            paddingVertical: 10,
            paddingHorizontal: 30,
          }} onPress={handleSubmit}>Submit</RsButton>
        </View>

        <ScrollView>
          <View style={{}}>
            <Text style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#212121",
              paddingBottom: 10,
            }}>Selected</Text>
            <FlatList
              data={allDbCategories?.filter(el => selectedItems?.includes(el.id))}
              numColumns={3}
              renderItem={({ item }) => (
                <View style={styles.childCategoryItem}>
                  <View style={styles.logoWrapper}>
                    {item?.logo && <Image style={styles.childCategoryImg} source={{ uri: item?.logo }} />}
                  </View>
                  <Text style={styles.childCategoryText}>{item?.name}</Text>
                </View>
              )} />
          </View>

          <Text style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#212121",
            paddingBottom: 10,
          }}>All</Text>
          <View style={styles.childCategoriesGrid}>
            <FlatList
              data={allDbCategories}
              numColumns={3}
              renderItem={({ item }) => (
                <View style={styles.childCategoryItem}>
                  <View style={styles.logoWrapper}>
                    {item?.logo && <Image style={styles.childCategoryImg} source={{ uri: item?.logo }} />}
                  </View>
                  <Text style={styles.childCategoryText}>{item?.name}</Text>
                  <CheckBox onChange={() => handleChange(item.id)}
                            checked={selectedItems?.includes(item.id)}
                            label=""
                  />
                </View>
              )} />
          </View>


        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "rgba(68,112,73,0.98)",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "",
  },
  childCategories: {
    padding: 5,
  },
  childCategoriesGrid: {

    flex: 1,
  },

  childCategoryItem: {
    width: "33.33%",
    marginBottom: 10,
    padding: 0,
    borderRadius: 5,
    alignItems: "center",
  },
  childCategoryText: {
    color: colors["gray-16"],
    fontSize: 12,
    fontWeight: "300",
    textAlign: "center",
  },
  childCategoryImg: {
    height: 30,
    aspectRatio: 1,
  },

  rootCategoryImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  icon: {},
  logoContainer: {
    marginVertical: 0,
  },
  logoButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  logoButtonText: {
    marginLeft: 10,
    color: "#1E90FF",
  },
  logoPreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default SelectRooCategories;
