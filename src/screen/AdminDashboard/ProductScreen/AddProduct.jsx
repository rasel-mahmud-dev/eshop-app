import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker";
import { BlurView } from "@react-native-community/blur";
import useReducer from "../../../hooks/useReducer";
import FileUpload from "../../../services/FileUpload";
import SelectInput from "../../../components/SelectInput";
import { useBrandStore, useCategoryStore } from "../../../store";
import { apis } from "../../../apis";
import { useToast } from "../../../lib/ToastService";
import catchAxiosError from "../../../utils/catchAxiosError";
import Loader from "../../../components/Loader/Loader";
import InputField from "../../../components/InputField";
import RsButton from "../../../components/RsButton/RsButton";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";

const pickImage = (callback) => {
  ImagePicker.openPicker({
    width: 300,
    height: 300,
    cropping: true,
    mediaType: "photo",
  }).then(image => {
    callback({ uri: image.path });
  }).catch(error => {
    console.log("ImagePicker Error: ", error);
  });
};

const AddProduct = ({ route, navigate }) => {

  const { productId } = route.params;

  const { onClose, onSuccess, editItem = null } = {};

  const { allDbCategories, setAllDbCategories } = useCategoryStore();
  const { brands, setBrands } = useBrandStore();
  const { error, success } = useToast();

  const [state, setState] = useReducer({
    name: "",
    category: "",
    brand: "",
    price: "",
    description: "",
    image: null,
    isUploadingImage: false,
    uploadedUrl: "",
  });

  useEffect(() => {
    if (!allDbCategories.length) {
      apis.get("/categories/all").then((res) => {
        const data = res?.data?.data;
        if (data) {
          setAllDbCategories(data);
        }
      });
    }
    if (!brands.length) {
      apis.get("/brands").then((res) => {
        const data = res?.data?.data;
        if (data) {
          brands(data);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!productId) return;
    apis.get(`/products/${productId}`).then(res=>{
      const data = res?.data?.data
      if(!data) return;


    })

  }, [productId])


  async function uploadImage(uri) {
    try {
      setState({ isUploadingImage: true });
      const result = await FileUpload.uploadImage(uri, "product");
      const fileUrl = result.data?.[0]?.url;
      setState({
        isUploadingImage: false,
        uploadedUrl: fileUrl,
      });
      success("Image has uploaded.");
      return true;
    } catch (ex) {
      error(catchAxiosError(ex));
      return false;
    } finally {
      setState({
        isUploadingImage: false,
      });
    }
  }

  async function handleSubmit() {
    try {
      state.image && await uploadImage(state.image);

      if (editItem?.id) {
        const data = await apis.patch("/products", {
          id: editItem.id,
          title: state.title,
          image: state.uploadedUrl,
          category: state.category?.value,
          brand: state.brand?.value,
          price: state.price,
          description: state.description,
        });
        if (!data) throw new Error("Please try again later");
        success("Product updated successfully");

      } else {
        const data = await apis.post("/products", {
          title: state.title,
          image: state.uploadedUrl,
          categoryId: state.category?.value,
          brandId: state.brand?.value,
          price: state.price,
          description: state.description,
        });
        if (!data) throw new Error("Please try again later");
        success("Product added successfully");
      }

      onClose(false);
      onSuccess();
    } catch (ex) {
      error(catchAxiosError(ex));
    }
  }

  function handleChange({ name, value }) {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <View>

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
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1c1c1c" }}>{ !rproductId ? "Update" : "Add " } Products</Text>
        </View>
        <View>
          <AntDesign style={{ color: "#4f4f4f" }} name="search1" size={20} />
        </View>
      </View>


      {state.isUploadingImage && (
        <View style={styles.overlay}>
          <BlurView style={styles.blurView} blurType="light" blurAmount={4} />
          <View style={styles.loaderContainer}>
            <Loader />
            <Text style={styles.uploadingText}>Uploading Image</Text>
          </View>
        </View>
      )}

      <View style={styles.container}>
        <Text style={styles.title}>{editItem ? "Update Product" : "Add Product"}</Text>

        <SelectInput
          label="Category"
          name="category"
          options={allDbCategories?.map(item => ({ label: item.name, value: item.id })) || []}
          value={state.category}
          onValueChange={handleChange}
          placeholder="Select a category"
        />

        <SelectInput
          label="Brand"
          name="brand"
          options={brands?.map(item => ({ label: item.name, value: item.id })) || []}
          value={state.brand}
          onValueChange={handleChange}
          placeholder="Select a brand"
        />

        <InputField
          name="title"
          icon={<Icon name="cube-outline" size={20} color="#555" style={styles.icon} />}
          label="Product Name"
          placeholder="Enter product name"
          value={state.title}
          onChangeText={handleChange}
        />

        <InputField
          name="price"
          icon={<Icon name="pricetag-outline" size={20} color="#555" style={styles.icon} />}
          label="Price"
          placeholder="Enter product price"
          value={state.price}
          onChangeText={handleChange}
          keyboardType="numeric"
        />

        <InputField
          name="description"
          icon={<Icon name="information-circle-outline" size={20} color="#555" style={styles.icon} />}
          label="Description"
          placeholder="Enter product description"
          value={state.description}
          onChangeText={handleChange}
          multiline
          numberOfLines={4}
        />

        <View style={styles.imageContainer}>
          <Text style={styles.imageLabel}>Image</Text>
          <TouchableOpacity onPress={() => pickImage((image) => handleChange({ name: "image", value: image.uri }))}>
            {state.uploadedUrl || state.image ?
              <Image source={{ uri: state.uploadedUrl || state.image }} style={styles.imagePreview} />
              : (
                <View style={styles.imageButton}>
                  <Icon name="image-outline" size={20} color="#555" />
                  <Text style={styles.imageButtonText}>Select Image</Text>
                </View>
              )}
          </TouchableOpacity>
        </View>

        <RsButton onPress={handleSubmit}>
          <Text>{productId ? "Update" : "Add"} Product</Text>
        </RsButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    zIndex: 2,
    left: 0,
    top: -10,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(23,23,23,0.19)",
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  uploadingText: {
    color: "#232323",
    fontWeight: "600",
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#212121",
    paddingBottom: 10,
  },
  icon: {},
  imageContainer: {
    marginVertical: 10,
  },
  imageLabel: {
    color: "#838383",
    fontSize: 14,
    fontWeight: "500",
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  imageButtonText: {
    marginLeft: 10,
    color: "#1E90FF",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default AddProduct;
