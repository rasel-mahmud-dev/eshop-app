import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import InputField from "../../../components/InputField";
import RsButton from "../../../components/RsButton/RsButton";
import { useToast } from "../../../lib/ToastService";
import useReducer from "../../../hooks/useReducer";
import { apis } from "../../../apis";
import catchAxiosError from "../../../utils/catchAxiosError";
import SelectInput from "../../../components/SelectInput";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const AddUser = ({ onClose, onSuccess, editItem = null }) => {
  const { error, success } = useToast();
  const init = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "",
  };
  const [state, setState] = useReducer(init);

  useEffect(() => {
    if (!editItem?.id) return;
    console.log(editItem);
    setState({
      firstName: editItem?.first_name,
      lastName: editItem?.last_name,
      email: editItem?.email,
      phoneNumber: editItem?.phone_number,
      role: { value: editItem?.role, label: "" },
    });

    return () => setState(init);
  }, [editItem]);


  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  async function fetchRoles() {
    try {
      const res = await apis.get("/admin/roles");
      setRoles(res?.data?.data || []);
    } catch (ex) {
      error(catchAxiosError(ex));
    }
  }

  async function handleSubmit() {
    try {
      if (editItem?.id) {
        const data = await apis.patch(`/admin/users/${editItem.id}`, {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          password: state.password,
          phoneNumber: state.phoneNumber,
          role: state.role?.value,
        });
        if (!data) throw new Error("Please try again later");
        success("User updated successfully");

      } else {
        const data = await apis.post("/admin/users", {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          password: state.password,
          phoneNumber: state.phoneNumber,
          role: state.role?.value,
        });
        if (!data) throw new Error("Please try again later");
        success("User added successfully");
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

  function handleFillData() {
    setState({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "123",
      phoneNumber: "123-456-7890",
      role: roles.length > 0 ? { value: roles[0].id, label: roles[0].name } : "",
    });
    success("Sample data filled in");
  }

  return (
    <View style={styles.formContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{editItem ? "Update User" : "Create User"}</Text>
        <TouchableOpacity onPress={handleFillData} style={styles.fillDataIcon}>
          <SimpleLineIcons name="magic-wand" size={24} color="#1E90FF" />
        </TouchableOpacity>
      </View>

      <InputField
        name="firstName"
        icon={<Icon name="person-outline" size={20} color="#555" style={styles.icon} />}
        label="First Name"
        placeholder="Enter first name"
        value={state.firstName}
        onChangeText={handleChange}
      />

      <InputField
        name="lastName"
        icon={<Icon name="person-outline" size={20} color="#555" style={styles.icon} />}
        label="Last Name"
        placeholder="Enter last name"
        value={state.lastName}
        onChangeText={handleChange}
      />

      <InputField
        name="email"
        icon={<Icon name="mail-outline" size={20} color="#555" style={styles.icon} />}
        label="Email"
        placeholder="Enter email address"
        value={state.email}
        onChangeText={handleChange}
      />

      <InputField
        name="phoneNumber"
        icon={<Icon name="call-outline" size={20} color="#555" style={styles.icon} />}
        label="Phone Number"
        placeholder="Enter phone number"
        value={state.phoneNumber}
        onChangeText={handleChange}
      />

      <InputField
        name="password"
        icon={<Icon name="key" size={20} color="#555" style={styles.icon} />}
        label="Password"
        placeholder="Enter password"
        value={state.password}
        onChangeText={handleChange}
      />


      <SelectInput
        label="Role"
        name="role"
        options={roles?.map(item => ({ label: item.name, value: item.id })) || []}
        value={state.role}
        onValueChange={handleChange}
        placeholder="Select a role"
      />

      <RsButton onPress={handleSubmit}>
        <Text style={styles.buttonText}>{editItem ? "Update User" : "Add User"}</Text>
      </RsButton>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {},
  formContainer: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  fillDataIcon: {
    marginLeft: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#212121",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "500",
    color: "white",
  },
});

export default AddUser;
