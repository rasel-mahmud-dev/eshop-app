import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BottomSheet from "../../../components/BottomSheet/BottomSheet";
import categoryAction from "../../../store/actions/categoryAction";
import { useCategoryStore } from "../../../store";
import { apis, setAuthorization } from "../../../apis";
import AntDesign from "react-native-vector-icons/AntDesign";


function CategoryListScreen({ navigation }) {

  const { categories, parentCategories, setParentCategories } = useCategoryStore();

  const [selectedCategory, setSelectedCategory] = useState();

  const bottomSheetRef = useRef(null);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    (async function() {
      await setAuthorization();
      const { data } = await apis.get("/categories/parent");
      setParentCategories(data.data);

    }());
  }, []);

  return (
    <>
      <View style={styles.container}>

        <View style={{ padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1c1c1c" }}>Categories</Text>
          <View>
            <AntDesign style={{ color: "#4f4f4f" }} name="search1" size={20} />
          </View>
        </View>

        <View style={{ paddingStart: 10 }}>
          <FlatList
            horizontal={true}
            data={parentCategories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedCategory(item)}
                                style={[
                                  styles.card,
                                  selectedCategory?.id === item?.id
                                    ? { borderColor: "#6fc595", borderWidth: 1 }
                                    : {},
                                ]}>
                <Image
                  source={{ uri: "https://5.imimg.com/data5/SELLER/Default/2023/3/292019880/YM/MK/PO/104903331/apple-iphone-14-pro-max-250x250.jpg" }}
                  style={styles.icon} />
                <Text style={styles.cardText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1c1c1c", paddingBottom: 16 }}>Sub-Categories</Text>
          <FlatList

            numColumns={2}
            data={parentCategories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedCategory(item)}
                                style={[
                                  styles.card,
                                ]}>
                <Image
                  source={{ uri: "https://5.imimg.com/data5/SELLER/Default/2023/3/292019880/YM/MK/PO/104903331/apple-iphone-14-pro-max-250x250.jpg" }}
                  style={styles.icon} />
                <Text style={styles.cardText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("CreateCategory")}
        >
          <Icon name="add-circle-outline" size={50} color="#1E90FF" />
        </TouchableOpacity>


        {/*<BottomSheet*/}
        {/*  ref={bottomSheetRef}*/}
        {/*  onChange={handleSheetChanges}*/}
        {/*>*/}
        {/*  <BottomSheetView style={styles.contentContainer}>*/}
        {/*    <Text>Awesome 🎉</Text>*/}
        {/*  </BottomSheetView>*/}
        {/*</BottomSheet>*/}

      </View>
      {/*<BottomSheet>*/}
      {/*  <Text>sdf</Text>*/}
      {/*</BottomSheet>*/}
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    // padding: 20,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    justifyContent: "center",
  },
  card: {
    overflow: "hidden",
    width: 100,
    flex: 1,
    alignItems: "center",
    height: 100,
    justifyContent: "center",
    padding: 15,
    marginHorizontal: 4,
    marginVertical: 2,
    borderRadius: 10,

    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // elevation: 8,
  },
  cardText: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default CategoryListScreen;
