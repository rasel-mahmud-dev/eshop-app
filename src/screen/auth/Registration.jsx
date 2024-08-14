import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../components/InputField";
import RsButton from "../../components/RsButton/RsButton";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { apis } from "../../apis";
import toast from "../../components/Toast";
import { useToast } from "../../lib/ToastService";
import catchAxiosError from "../../utils/catchAxiosError";


const RegistrationPage = () => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const toast = useToast();

  async function handleRegister() {
    try {

      const { data } = await apis.post("/auth/register", state);
      console.log(data);
      toast.success("Registration Successful");
      navigation.navigate("Home"); // Navigate to Home or any other page after registration
    } catch (ex) {
      toast.error(catchAxiosError(ex));
    }
  }

  function handleChange(e) {
    const { name, value } = e;
    setState((prevState) => ({
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
        style={styles.gradientBackground}
      >

        <View style={styles.logoWrapper}>
          <Image source={require("../../assets/login.png")} style={styles.logo} />
        </View>

        <View style={styles.formWrapper}>
          <Text style={styles.formTitle}>Register</Text>

          <InputField
            name="firstName"
            icon={<Icon name="person-outline" size={20} color="#555" style={styles.icon} />}
            label="First Name"
            placeholder="Enter your first name"
            value={state.firstName}
            onChangeText={handleChange}
          />

          <InputField
            name="email"
            icon={<Icon name="mail-outline" size={20} color="#555" style={styles.icon} />}
            label="Email"
            placeholder="Enter your email"
            value={state.email}
            onChangeText={handleChange}
          />

          <InputField
            name="password"
            icon={<Icon name="lock-closed-outline" size={20} color="#555" style={styles.icon} />}
            label="Password"
            placeholder="Enter your password"
            value={state.password}
            onChangeText={handleChange}
            secureTextEntry
          />

          <RsButton onPress={handleRegister}>Register</RsButton>

          <View style={styles.socialContainer}>
            <Text style={styles.socialText}>Or Sign Up With</Text>
            <View style={styles.socialIcons}>
              <TouchableOpacity onPress={() => {/* Handle Google Sign Up */
              }}>
                <FontAwesome style={styles.socialIcon("g")} name="google" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {/* Handle Facebook Sign Up */
              }}>
                <FontAwesome style={styles.socialIcon("f")} name="facebook" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkText}>Already have an account? Log In</Text>
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
  gradientBackground: {
    height: "100%",
  },
  logoWrapper: {
    height: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 150,
    aspectRatio: 1,
  },
  formWrapper: {
    height: 650,
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
  icon: {
    // Customize icon style if needed
  },
  socialContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  socialText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  socialIcon: (n) => ({
    width: 40,
    height: 40,
    marginHorizontal: 15,
    justifyContent: "center",
    textAlign: "center",
    lineHeight: 40,
    fontSize: 20,
    borderRadius: 40,
    color: n === "g" ? "red" : "green",
    backgroundColor: n === "g" ? "rgba(255,151,151,0.6)" : "rgba(142,208,128,0.35)",
  }),
  linkText: {
    color: "#007BFF",
    textAlign: "center",
    marginTop: 15,
  },
});

export default RegistrationPage;
