import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";

const RsButton = ({ onPress, loginButton={}, style, textStyle, children, variant }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 2 }}
      colors={["#5851DB", "#E1306C"]}
      style={[styles.loginButtonGradient, style]}
    >
      <TouchableOpacity style={[styles.loginButton, loginButton]} onPress={onPress}>
        {typeof children === "string" ? <Text style={[styles.loginButtonText, textStyle]}>{children}</Text> : children}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  loginButtonGradient: {
    borderRadius: 25,
    marginTop: 20,
    elevation: 3,
    shadowColor: "#2a2a2a",
  },
  loginButton: {
    paddingVertical: 10,
    paddingHorizontal: 100,

  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default RsButton;
