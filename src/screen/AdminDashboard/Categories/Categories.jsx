import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  ToastAndroid, Button,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useCategoryStore, usePromptStore } from "../../../store";
import { apis, setAuthorization } from "../../../apis";
import AntDesign from "react-native-vector-icons/AntDesign";
import BottomSheet from "../../../components/BottomSheet/BottomSheet";
import RsButton from "../../../components/RsButton/RsButton";
import AddCategory from "./AddCategory";
import Ionicons from "react-native-vector-icons/Ionicons";
import CenteredPrompt from "../../../components/CenteredPrompt";
import catchAxiosError from "../../../utils/catchAxiosError";
import throwError from "../../../utils/throwError";
import Entypo from "react-native-vector-icons/Entypo";
import { useToast } from "../../../lib/ToastService";


function CategoryListScreen({ navigation }) {

  const toast = useToast();
  const [promptVisible, setPromptVisible] = useState(false);

  const handleOpenPrompt = () => {
    setPromptVisible(true);
  };

  const handleClosePrompt = () => {
    setPromptVisible(false);
  };

  const handleConfirm = () => {
    Alert.alert("Confirmed");
    setPromptVisible(false);
  };

  const { subCategories, setSubCategories, parentCategories, setParentCategories } = useCategoryStore();
  const { setOpen } = usePromptStore();

  const [selectedCategory, setSelectedCategory] = useState();
  const [isOpenBottomSheet, setOpenBottomSheet] = useState(false);
  const [editItem, setEditItem] = useState(null);


  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    await setAuthorization();
    const { data } = await apis.get("/categories/parent");
    setParentCategories(data.data);
    if (data?.data?.length) {
      setSelectedCategory(data?.data[0]);
      await fetchSubCategories(data?.data[0]);
    }
    ToastAndroid.show("call /categories/parent", 1000);
  }


  async function fetchSubCategories(item, force = false) {
    setSelectedCategory(item);
    if (!subCategories[item.id]?.length || force) {
      await setAuthorization();
      const { data } = await apis.get(`/categories/sub-categories/${item.id}`);
      setSubCategories(item.id, data.data);
    }
  }

  async function handleDeleteItem(id) {
    try {
      const { data } = await apis.delete(`/categories/${id}`);
      toast.success("Deleted..");
      fetchSubCategories(selectedCategory, true);
    } catch (ex) {
      toast.error(catchAxiosError(ex));
    }
  }


  async function handleDeleteParentItem() {
    try {
      const parentId = selectedCategory?.id;
      if (!parentId) return throwError(400, "First select a category");
      // const isOk = await setOpen("delete");
      const { data } = await apis.delete(`/categories/parent/${parentId}`);
      toast.success("Deleted..");
    } catch (ex) {
      toast.error(catchAxiosError(ex));
    } finally {
      fetchCategories()
    }
  }

  function refreshCategory(type, value) {
    if (type === "REFRESH_SUB_CATEGORY") {
      fetchSubCategories({ id: value, name: "" }, true);
    } else {
      fetchCategories();
    }
  }

  const logo = "https://5.imimg.com/data5/SELLER/Default/2023/3/292019880/YM/MK/PO/104903331/apple-iphone-14-pro-max-250x250.jpg";

  function handleCloseBottomSheet() {
    setOpenBottomSheet(false);
    setEditItem(null);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={{ padding: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{
            padding: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo name="chevron-small-left" style={{ color: "#1c1c1c", justifyContent: "center", fontSize: 25 }} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1c1c1c" }}>Categories</Text>
          </View>
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
              <TouchableOpacity onPress={() => fetchSubCategories(item)}
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#1c1c1c",
            }}>{selectedCategory?.name || "Sub category"}</Text>
            <RsButton onPress={handleDeleteParentItem} loginButton={{
              paddingHorizontal: 30,
              columnGap: 5,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Ionicons style={styles.trashIcon} name="trash-outline" size={20} color={"white"} />
              <Text style={{ fontSize: 10, fontWeight: "bold", color: "#ffffff" }}>Delete All</Text>
            </RsButton>
          </View>
          <FlatList
            numColumns={2}
            data={subCategories[selectedCategory?.id]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.card,
                ]}>

                <Image
                  source={{ uri: item?.logo || logo }}
                  style={styles.icon} />
                <Text style={styles.cardText}>{item.name}</Text>

                <View style={styles.trashIconWrapperRoot}>
                  <TouchableOpacity style={styles.trashIconWrapper} onPress={() => setEditItem(item)}>
                    <Ionicons style={styles.pencilIcon} name="pencil-outline" size={20} color={"green"} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.trashIconWrapper} onPress={() => handleDeleteItem(item.id)}>
                    <Ionicons style={styles.trashIcon} name="trash-outline" size={20} color={"red"} />
                  </TouchableOpacity>
                </View>

              </TouchableOpacity>
            )}
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setOpenBottomSheet(prevState => !prevState)}
        >
          <Icon name="add-circle-outline" size={50} color="#1E90FF" />
        </TouchableOpacity>

      </View>

      <CenteredPrompt
        id={"delete"}
        onClose={handleClosePrompt}
        onConfirm={handleConfirm}
        message="Are you sure you want to proceed?"
      />

      <BottomSheet
        height={400}
        backdrop={{ backgroundColor: "rgba(31,31,31,0.75)" }}
        style={{
          paddingTop: 0,
          paddingHorizontal: 0,
          paddingBottom: 0,
          backgroundColor: "#ffffff",
          overflow: "scroll",
        }}
        isOpen={isOpenBottomSheet || editItem?.id}
        onClose={handleCloseBottomSheet}>
        <ScrollView>
          <AddCategory
            editItem={editItem}
            onClose={handleCloseBottomSheet}
            onSuccess={refreshCategory}
          />
        </ScrollView>
      </BottomSheet>
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
    height: 120,
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
  trashIconWrapperRoot: {
    paddingTop: 10,
    columnGap: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trashIconWrapper: {
    // zIndex: 1000,
    // position: "absolute",
    // top: 10,
    // right: 10,
    padding: 5,
    shadowColor: "#ff0505",
    shadowOpacity: 1,
    elevation: 4,
    borderRadius: 6,
    backgroundColor: "rgb(255,203,203)",
  },
  trashIcon: {

    fontSize: 14,

  },
});

export default CategoryListScreen;
