import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
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
import { useToast } from "../../../lib/ToastService";
import catchAxiosError from "../../../utils/catchAxiosError";

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

const categoryTypes = [
  { label: "Root Category", value: "category_group" },
  { label: "Sub Category", value: "sub_category" },
  { label: "Category", value: "category" },
];

const AddCategory = ({ onClose, initData, onSuccess }) => {

  const { allDbCategories, setAllDbCategories } = useCategoryStore();
  const { error, success } = useToast();

  const [state, setState] = useReducer({
    name: "",
    parentId: "",
    type: "",
    logo: null,
    isUploadingLogo: false,
    uploadedUrl: "",
  });

  useEffect(() => {
    if (allDbCategories.length) return;
    apis.get("/categories/filter").then((res) => {
      const data = res?.data?.data;
      if (data) {
        setAllDbCategories(data);
      }
    });
  }, []);

  useEffect(() => {
    if (!Object.keys(initData).length) return;
    setState(prev => {
      let intialState = { ...prev };
      if (initData?.parentId) intialState.parentId = { label: "", value: initData.parentId };
      if (initData?.type) intialState.type = { label: "", value: initData.type };
      return intialState;
    });

  }, [allDbCategories?.length, initData]);

  async function uploadLogo(uri) {
    try {
      setState({ isUploadingLogo: true });
      const result = await FileUpload.uploadImage(uri, "category");
      const fileUrl = result.data?.[0]?.url;
      setState({
        isUploadingLogo: false,
      });
      success("Logo has uploaded.");
      return fileUrl;
    } catch (ex) {
      error(catchAxiosError(ex));
      return null;
    } finally {
      setState({
        isUploadingLogo: false,
      });
    }
  }

  async function handleSubmit() {
    try {
      let uploadedUrl = state?.uploadedUrl;
      if (state?.logo) {
        const result = await uploadLogo(state.logo);
        if (result) uploadedUrl = result;
      }

      const data = await categoryAction.addCategory({
        name: state.name,
        logo: uploadedUrl,
        parentId: state.parentId?.value,
        type: state.type?.value,
      });

      if (!data) throw new Error("Please try again later");
      success("Category added successfully");


      onClose(false);
      onSuccess(state);
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
        <Text style={{
          fontSize: 25,
          fontWeight: "bold",
          color: "#212121",
          paddingBottom: 10,
        }}>Create</Text>

        <SelectInput
          label="Type"
          icon={<Icon name="folder-outline" size={20} color="#555" style={styles.icon} />}
          name="type"
          options={categoryTypes}
          value={state.type}
          onValueChange={handleChange}
          placeholder="Select a Type"
        />

        <SelectInput
          label="Parent"
          icon={<Icon name="folder-outline" size={20} color="#555" style={styles.icon} />}
          name="parentId"
          options={allDbCategories?.map(item => ({ label: item.name, value: item.id })) || []}
          value={state.parentId}
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
          <TouchableOpacity onPress={() => pickImage((image) => handleChange({ name: "logo", value: image.uri }))}>
            {state.uploadedUrl || state.logo ?
              <Image source={{ uri: state.uploadedUrl || state.logo }} style={styles.logoPreview} />
              : (
                <View style={styles.logoButton}>
                  <Icon name="image-outline" size={20} color="#555" />
                  <Text style={styles.logoButtonText}>Select Logo</Text>
                </View>
              )}
          </TouchableOpacity>
        </View>

        <RsButton onPress={handleSubmit}>
          <Text style={{
            textAlign: "center",
            fontWeight: "500",
            color: "white",
          }}>Create Category</Text>
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