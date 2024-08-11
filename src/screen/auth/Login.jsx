import React from "react";
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import Form from "./Form";
import { LinearGradient } from "react-native-linear-gradient";

import { useNavigation } from "@react-navigation/native";

const LoginPage = () => {
  const navigation = useNavigation();
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

          <Form />

          <TouchableOpacity onPress={() => {
          }}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
          }}>
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.navigate("Home")
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
    // backgroundColor: "#ddd"
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
});

export default LoginPage;
