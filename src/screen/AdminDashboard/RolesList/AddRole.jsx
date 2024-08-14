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


const AddRole = ({ onClose, onSuccess, editItem = null }) => {
  const { error, success } = useToast();
  const init = {
    name: "",
    slug: "",
    description: "",
  };
  const [state, setState] = useReducer(init);

  useEffect(() => {
    if (!editItem?.id) return;
    setState({
      name: editItem?.name,
      slug: editItem?.slug,
      description: editItem?.description,
    });

    return () => setState(init);
  }, [editItem]);

  async function handleSubmit() {
    try {

      if (editItem?.id) {
        const data = await apis.patch(`/admin/roles/${editItem.id}`, {
          name: state.name,
          slug: state.slug,
          description: state.description,
        });
        if (!data) throw new Error("Please try again later");
        success("Role updated successfully");

      } else {
        const data = await apis.post("/admin/roles", {
          name: state.name,
          slug: state.slug,
          description: state.description,
        });
        if (!data) throw new Error("Please try again later");
        success("Role added successfully");
      }
      setState(init);
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
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>{editItem ? "Update Role" : "Create Role"}</Text>

        <InputField
          name="name"
          icon={<Icon name="person-outline" size={20} color="#555" style={styles.icon} />}
          label="Role Name"
          placeholder="Enter role name"
          value={state.name}
          onChangeText={handleChange}
        />

        <InputField
          name="slug"
          icon={<Icon name="link-outline" size={20} color="#555" style={styles.icon} />}
          label="Role Slug"
          placeholder="Enter role slug"
          value={state.slug}
          onChangeText={handleChange}
        />

        <InputField
          name="description"
          icon={<Icon name="document-text-outline" size={20} color="#555" style={styles.icon} />}
          label="Description"
          placeholder="Enter role description"
          value={state.description}
          onChangeText={handleChange}
        />

        <RsButton onPress={handleSubmit}>
          <Text style={{
            textAlign: "center",
            fontWeight: "500",
            color: "white",
          }}>{editItem ? "Update Role" : "Add Role"}</Text>
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

export default AddRole;
