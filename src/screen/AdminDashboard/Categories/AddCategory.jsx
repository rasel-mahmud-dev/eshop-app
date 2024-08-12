import React, { useState } from "react";
import { View, Alert, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker"; // Import the image picker
import categoryAction from "../../../store/actions/categoryAction";
import InputField from "../../../components/InputField";
import RsButton from "../../../components/RsButton/RsButton";

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

const AddCategory = ({onClose}) => {
  const [state, setState] = useState({
    name: "Test",
    description: "test desc",
    logo: null,
  });

  async function handleSubmit() {
    try {
      const data = await categoryAction.addCategory(state.name, state.logo, null);
      if (!data) throw new Error("Please try again later");
      Alert.alert("Success", "Category added successfully");
      onClose(false)
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
        <TouchableOpacity onPress={() => pickImage((image) => handleChange("logo", image))}>
          <View style={styles.logoButton}>
            <Icon name="image-outline" size={20} color="#555" />
            <Text style={styles.logoButtonText}>Select Logo</Text>
          </View>
        </TouchableOpacity>
        {state.logo && <Image source={state.logo} style={styles.logoPreview} />}
      </View>


      <RsButton onPress={handleSubmit}>
        Add Category
      </RsButton>

    </View>
  );
};

const styles = StyleSheet.create({

  icon: {},
  logoContainer: {
    marginVertical: 0,
    alignItems: "center",
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
