import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "react-native-linear-gradient";

export default function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="person-outline" size={20} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>

        <Icon name="lock-closed-outline" size={20} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.rememberMeContainer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <Icon
            name={rememberMe ? "checkbox-outline" : "square-outline"}
            size={20}
            color="#1E90FF"
          />
        </TouchableOpacity>
        <Text style={styles.rememberMeText}>Remember me</Text>
      </View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        colors={["#5851DB", "#E1306C"]}
        style={styles.loginButton}
      >
        <TouchableOpacity>

          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </LinearGradient>
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
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#FFFFFF",

  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
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
  loginButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginTop: 20,
    elevation: 3,
    shadowColor: "#2a2a2a",

  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
