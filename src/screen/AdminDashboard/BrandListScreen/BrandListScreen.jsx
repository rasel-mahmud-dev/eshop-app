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
  ToastAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import BottomSheet from "../../../components/BottomSheet/BottomSheet";
import RsButton from "../../../components/RsButton/RsButton";
import AddBrand from "./AddBrand";
import Ionicons from "react-native-vector-icons/Ionicons";
import CenteredPrompt from "../../../components/CenteredPrompt";
import { useBrandStore, usePromptStore } from "../../../store";
import { apis, setAuthorization } from "../../../apis";
import catchAxiosError from "../../../utils/catchAxiosError";
import Entypo from "react-native-vector-icons/Entypo";
import { useToast } from "../../../lib/ToastService";

function BrandListScreen({ navigation }) {
  const toast = useToast();
  const { brands, setBrands } = useBrandStore();
  const [isOpenBottomSheet, setOpenBottomSheet] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const { setOpen } = usePromptStore();

  useEffect(() => {
    fetchBrands();
  }, []);

  async function fetchBrands() {
    await setAuthorization();
    const { data } = await apis.get("/brands");
    setBrands(data.data);
    ToastAndroid.show("Fetched brands", ToastAndroid.SHORT);
  }

  async function handleDeleteBrand(id) {
    try {
      const { data } = await apis.delete(`/brands/${id}`);
      toast.success("Brand deleted.");
      fetchBrands();
    } catch (ex) {
      toast.error(catchAxiosError(ex));
    }
  }

  function refreshBrand(type, value) {
    fetchBrands();
  }

  function handleCloseBottomSheet() {
    setOpenBottomSheet(false);
    setEditItem(null);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-small-left" style={styles.backButton} />
          </TouchableOpacity>
          <Text style={styles.title}>Brands</Text>
          <AntDesign style={styles.searchIcon} name="search1" size={20} />
        </View>

        <View style={styles.listContainer}>
          <FlatList
            numColumns={2}
            data={brands}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card}>
                <Image
                  source={{ uri: item.logo || "https://via.placeholder.com/150" }}
                  style={styles.icon}
                />
                <Text style={styles.cardText}>{item.name}</Text>
                <View style={styles.iconWrapper}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => setEditItem(item)}
                  >
                    <Ionicons style={styles.editIcon} name="pencil-outline" size={20} color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleDeleteBrand(item.id)}
                  >
                    <Ionicons style={styles.deleteIcon} name="trash-outline" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setOpenBottomSheet(true)}
        >
          <Icon name="add-circle-outline" size={50} color="#1E90FF" />
        </TouchableOpacity>
      </View>

      <CenteredPrompt
        id={"delete"}
        onClose={() => setPromptVisible(false)}
        onConfirm={() => {
          Alert.alert("Confirmed");
        }}
        message="Are you sure you want to proceed?"
      />

      <BottomSheet
        height={400}
        backdrop={{ backgroundColor: "rgba(31,31,31,0.75)" }}
        style={styles.bottomSheet}
        isOpen={isOpenBottomSheet || editItem?.id}
        onClose={handleCloseBottomSheet}
      >
        <ScrollView>
          <AddBrand
            brands={brands}
            editItem={editItem}
            onClose={handleCloseBottomSheet}
            onSuccess={refreshBrand}
          />
        </ScrollView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    color: "#1c1c1c",
    fontSize: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1c1c1c",
  },
  searchIcon: {
    color: "#4f4f4f",
  },
  listContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  iconWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  iconButton: {
    padding: 5,
    backgroundColor: "rgb(255,203,203)",
    borderRadius: 6,
  },
  editIcon: {
    fontSize: 20,
    color: "green",
  },
  deleteIcon: {
    fontSize: 20,
    color: "red",
  },
  bottomSheet: {
    paddingTop: 0,
    paddingHorizontal: 0,
    paddingBottom: 0,
    backgroundColor: "#ffffff",
    overflow: "scroll",
  },
});

export default BrandListScreen;
