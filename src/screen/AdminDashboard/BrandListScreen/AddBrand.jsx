import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker";
import { useToast } from "../../../lib/ToastService";
import InputField from "../../../components/InputField";
import RsButton from "../../../components/RsButton/RsButton";
import Loader from "../../../components/Loader/Loader";
import { BlurView } from "@react-native-community/blur";
import useReducer from "../../../hooks/useReducer";
import FileUpload from "../../../services/FileUpload";
import { apis } from "../../../apis";
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

const AddBrand = ({ onClose, onSuccess, editItem = null, brands }) => {
  const { error, success } = useToast();

  const [state, setState] = useReducer({
    name: "",
    logo: null,
    isUploadingLogo: false,
    uploadedUrl: "",
  });

  useEffect(() => {
    if (!editItem?.id) return;
    setState({
      name: editItem?.name,
      uploadedUrl: editItem?.logo,
    });
  }, [editItem]);

  async function uploadLogo(uri) {
    try {
      setState({ isUploadingLogo: true });
      const result = await FileUpload.uploadImage(uri, "brand");
      const fileUrl = result.data?.[0]?.url;
      setState({
        isUploadingLogo: false,
        uploadedUrl: fileUrl,
      });
      success("Logo has uploaded.");
      return true;
    } catch (ex) {
      error(catchAxiosError(ex));
      return false;
    } finally {
      setState({
        isUploadingLogo: false,
      });
    }
  }

  async function handleSubmit() {
    try {
      state.logo && await uploadLogo(state.logo);

      if (editItem?.id) {
        const data = await apis.patch(`/brands/${editItem.id}`, {
          name: state.name,
          logo: state.uploadedUrl,
        });
        if (!data) throw new Error("Please try again later");
        success("Brand updated successfully");

      } else {
        const data = await apis.post("/brands", {
          name: state.name,
          logo: state.uploadedUrl,
        });
        if (!data) throw new Error("Please try again later");
        success("Brand added successfully");
      }

      onClose(false);
      onSuccess("REFRESH_BRAND_LIST");
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
        <View style={styles.loaderContainer}>
          <BlurView
            style={styles.blurView}
            blurType="light"
            blurAmount={4}
          />
          <View style={styles.loaderInner}>
            <Loader />
            <Text style={styles.loaderText}>Uploading Logo</Text>
          </View>
        </View>
      )}

      <View style={styles.formContainer}>
        <Text style={styles.headerText}>{editItem ? "Update Brand" : "Create Brand"}</Text>

        <InputField
          name="name"
          icon={<Icon name="folder-outline" size={20} color="#555" style={styles.icon} />}
          label="Brand Name"
          placeholder="Enter brand name"
          value={state.name}
          onChangeText={handleChange}
        />

        <View style={styles.logoContainer}>
          <Text style={styles.logoLabel}>Logo</Text>
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
          <Text>{editItem ? "Update Brand" : "Add Brand"}</Text>
        </RsButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {},
  loaderContainer: {
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
  loaderInner: {
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    color: "#232323",
    fontWeight: "600",
  },
  formContainer: {
    padding: 20,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#212121",
    paddingBottom: 10,
  },
  logoContainer: {
    marginVertical: 10,
  },
  logoLabel: {
    color: "#838383",
    fontSize: 14,
    fontWeight: "500",
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

export default AddBrand;
