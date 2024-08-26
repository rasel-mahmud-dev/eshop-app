import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../components/InputField";
import authAction from "../../store/actions/authAction";
import catchAxiosError from "../../utils/catchAxiosError";
import localStorage from "../../services/LocalStorage";
import RsButton from "../../components/RsButton/RsButton";
import { useToast } from "../../lib/ToastService";
import { useAuthStore } from "../../store";

const LoginPage = ({ route }) => {
  const params = route.params;
  const navigation = useNavigation();
  const { setAuth } = useAuthStore();

  console.log(params);


  const toast = useToast();
  const [state, setState] = useState({
    email: "rasel.mahmud.dev@gmail.com",
    password: "123",
    rememberMe: false,
  });

  async function handleSubmit() {
    try {
      const data = await authAction.login(state.email, state.password);
      if (!data && !data?.user) throw new Error("Please try again later");
      await localStorage.set("token", data.token);
      await localStorage.set("auth", JSON.stringify(data?.user));
      setAuth(data.user);
      navigation.navigate("Home");
      toast.success("Success");

    } catch (ex) {
      console.log(catchAxiosError(ex));
      toast.error(catchAxiosError(ex));
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
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#5851DB", "#C13584", "#E1306C", "#FD1D1D", "#F77737"]}
        style={styles.linkTextinearGradient}
      >

        <View style={styles.logoWrapper}>
          <Image source={require("../../assets/login.png")} style={styles.logo} />
        </View>

        <View style={styles.formWrapper}>
          <Text style={styles.formTitle}>eShop</Text>

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

          <TouchableOpacity onPress={() => {
            // Handle forgot password logic
          }}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate("Registration");
          }}>
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate("Home");

          }}>
            <Text style={styles.linkText}>Home</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  linkTextinearGradient: {
    height: "100%",
  },
  formWrapper: {
    height: 550,
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 25,
    width: "100%",
    elevation: 20,
    shadowColor: "red",
    bottom: 0,
    position: "absolute",
  },
  formTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 40,
  },
  logoWrapper: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 150,
    aspectRatio: 1,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  linkText: {
    color: "#007BFF",
    textAlign: "center",
    marginTop: 15,
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
  icon: {
    // Customize icon style if needed
  },
});

export default LoginPage;
