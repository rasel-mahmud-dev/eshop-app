import React, { useEffect, useState } from "react";
import { View, Alert, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker"; // Import the image picker
import categoryAction from "../../../store/actions/categoryAction";
import InputField from "../../../components/InputField";
import RsButton from "../../../components/RsButton/RsButton";
import Loader from "../../../components/Loader/Loader";
import { BlurView } from "@react-native-community/blur";
import useReducer from "../../../hooks/useReducer";
import FileUpload from "../../../services/FileUpload";
import SelectInput from "../../../components/SelectInput";
import { useCategoryStore } from "../../../store";
import { apis } from "../../../apis";

const pickImage = (callback) => {
  ImagePicker.openPicker({
    width: 300,
    height: 300,
    cropping: true, // Optional: enables cropping functionality
    mediaType: "photo",
  }).then(image => {
    callback({ uri: image.path });
  }).catch(error => {
    console.log("ImagePicker Error: ", error);
  });
};

const AddCategory = ({ onClose, onSuccess }) => {

  const { allDbCategories, setAllDbCategories } = useCategoryStore();

  const [state, setState] = useReducer({
    name: "Test",
    parent: "",
    logo: null,
    isUploadingLogo: false,
    uploadedUrl: "",
  });

  useEffect(() => {
    if (allDbCategories.length) return;
    apis.get("/categories/all").then((res) => {
      const data = res?.data?.data;
      console.log(data);
      if (data) {
        setAllDbCategories(data);
      }
    });
  }, []);

  async function uploadLogo() {
    try {
      setState({ isUploadingLogo: true });
      const result = await FileUpload.uploadImage(state.logo?.uri, "category");
      const fileUrl = result.data?.[0]?.url;
      setState({
        isUploadingLogo: false,
        uploadedUrl: fileUrl,
      });
      return true;
    } catch (error) {
      Alert.alert("Image upload fail..", error.message);
      return false;
    } finally {
      setState({
        isUploadingLogo: false,
      });
    }
  }

  async function handleSubmit() {
    try {
      await uploadLogo();
      const data = await categoryAction.addCategory(state.name, state.uploadedUrl, state.parent?.value);
      if (!data) throw new Error("Please try again later");
      Alert.alert("Success", "Category added successfully");
      onClose(false);
      const type = state.parent?.value ? "REFRESH_SUB_CATEGORY" : "REFRESH_PARENT_CATEGORY";
      onSuccess(type, state.parent?.value);
    } catch (error) {
      Alert.alert("Error", error.message);
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
      {state.isUploadingLogo && (
        <View style={{
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
        }}>
          <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            blurType="light"
            blurAmount={4}
          />

          <View>
            <Loader />
            <Text style={{ color: "#232323", fontWeight: "600" }}>Uploading Logo</Text>
          </View>
        </View>
      )}

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "#212121", paddingBottom: 10 }}>Create</Text>

        <SelectInput
          label="Category"
          name="parent"
          options={allDbCategories?.map(item => ({ label: item.name, value: item.id })) || []}
          value={state.parent}
          onValueChange={handleChange}
          placeholder="Select a category"
        />

        <InputField
          name="name"
          icon={<Icon name="folder-outline" size={20} color="#555" style={styles.icon} />}
          label="Category Name"
          placeholder="Enter category name"
          value={state.name}
          onChangeText={handleChange}
        />

        <View style={styles.logoContainer}>
          <Text style={{ color: "#838383", fontSize: 14, fontWeight: "500" }}>Logo</Text>
          <TouchableOpacity onPress={() => pickImage((image) => handleChange({ name: "logo", value: image }))}>
            {state.logo ? <Image source={state.logo} style={styles.logoPreview} /> : (
              <View style={styles.logoButton}>
                <Icon name="image-outline" size={20} color="#555" />
                <Text style={styles.logoButtonText}>Select Logo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <RsButton onPress={handleSubmit}>
          Add Category
        </RsButton>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
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

export default AddCategory;
