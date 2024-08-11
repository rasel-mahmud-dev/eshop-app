import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "react-native-linear-gradient";
import InputField from "../../components/InputField";
import authAction from "../../store/actions/authAction";
import catchAxiosError from "../../utils/catchAxiosError";
import localStorage from "../../services/LocalStorage";
import RsButton from "../../components/RsButton/RsButton";

export default function Form() {

  const [state, setState] = useState({
    email: "rasel.mahmud.dev@gmail.com",
    password: "123",
    rememberMe: false,
  });

  async function handleSubmit() {
    try {
      const data = await authAction.login(state.email, state.password);
      if (!data) throw new Error("Please try again later");
      await localStorage.set("token", data.token);
      Alert.alert("Success", JSON.stringify(data));
    } catch (ex) {
      console.log(catchAxiosError(ex));
      Alert.alert(catchAxiosError(ex));
    }
  }

  function handleChange(e) {
    const { name, value } = e;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <View style={styles.container}>
      <InputField
        name="email"
        icon={<Icon name="person-outline" size={20} color="#555" style={styles.icon} />}
        label="Email"
        placeholder="Enter email"
        value={state.email}
        onChangeText={handleChange}
      />

      <InputField
        name="password"
        icon={<Icon name="lock-closed-outline" size={20} color="#555" style={styles.icon} />}
        label="Password"
        placeholder="Password"
        value={state.password}
        onChangeText={handleChange}
        secureTextEntry
      />

      <View style={styles.rememberMeContainer}>
        <TouchableOpacity onPress={() => setState(prevState => ({
          ...prevState,
          rememberMe: !prevState.rememberMe,
        }))}>
          <Icon
            name={state.rememberMe ? "checkbox-outline" : "square-outline"}
            size={20}
            color="#1E90FF"
          />
        </TouchableOpacity>
        <Text style={styles.rememberMeText}>Remember me</Text>
      </View>
      <RsButton onPress={handleSubmit}>Login</RsButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 25,
    // paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#FFFFFF",

  },
  icon: {},
  input: {
    // flex: 1,
    // height: 40,
    border: "none",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  rememberMeText: {
    marginLeft: 5,
    color: "#1E90FF",
  },

});
