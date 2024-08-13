import React, { useState } from "react";
import { View, Alert, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker"; // Import the image picker
import categoryAction from "../../../store/actions/categoryAction";
import InputField from "../../../components/InputField";
import RsButton from "../../../components/RsButton/RsButton";
import Loader from "../../../components/Loader/Loader";
import { BlurView } from "@react-native-community/blur";
import useReducer from "../../../hooks/useReducer";
import fileAction from "../../../store/actions/fileAction";
import FileUpload from "../../../services/FileUpload";

// Function to handle the image picker
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

const AddCategory = ({ onClose }) => {


  const [state, setState] = useReducer({
    name: "Test",
    description: "test desc",
    logo: null,
    isUploadingLogo: false,
  });


  async function uploadLogo() {
    try {
      setState({
        isUploadingLogo: true,
      });

      // const data = await fileAction.uploadFile(state.logo);
      const result = await FileUpload.uploadImage(state.logo?.uri, "category");
      console.log(result);

      setTimeout(() => {
        setState({
          isUploadingLogo: false,
        });
      }, 5000);
      return false;

    } catch (error) {
      Alert.alert("Error", error.message);
      setState({
        isUploadingLogo: false,
      });
    }
  }


  async function handleSubmit() {
    try {
      const done = await uploadLogo();
      if (!done) return;

      const data = await categoryAction.addCategory(state.name, state.logo, null);
      if (!data) throw new Error("Please try again later");
      Alert.alert("Success", "Category added successfully");
      onClose(false);
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
        <InputField
          name="name"
          icon={<Icon name="folder-outline" size={20} color="#555" style={styles.icon} />}
          label="Category Name"
          placeholder="Enter category name"
          value={state.name}
          onChangeText={handleChange}
        />

        <InputField
          name="description"
          icon={<Icon name="document-text-outline" size={20} color="#555" style={styles.icon} />}
          label="Description"
          placeholder="Enter description"
          value={state.description}
          handleChange
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
