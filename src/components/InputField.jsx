// src/components/InputField.js
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import colors from "../styles/colors";
import Foundation from "react-native-vector-icons/Foundation";

const InputField = ({ label, required, name, onChangeText, icon, labelStyle = {}, multiline = false, ...props }) => {
  return (
    <View style={styles.container}>

      {icon && icon}

      <View>
        <View style={styles.labelRoot}>
          <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
          {required ? <Foundation name="asterisk" size={10} color={colors["red-300"]} /> : null}
        </View>

        <TextInput
          {...props}
          multiline={multiline}
          style={styles.input(multiline)}
          placeholderTextColor={colors["gray-900"]}
          onChangeText={(t) => onChangeText({ name, value: t })}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    marginBottom: 12,
    width: "100%",
    backgroundColor: "rgba(234,234,234,0.39)",
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  labelRoot: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
    justifyContent: "flex-start",
  },
  label: {
    marginBottom: 2,
    fontSize: 14,
    color: colors["gray-400"],
    fontWeight: "500",
  },
  input: (multiline) => ({
    height: multiline ? "auto" : 40,
    marginTop: 2,
    borderRadius: 8,
    borderWidth: 0,

    color: "#000",
    textColor: "red",
    placeholderTextColor: "red",

  }),
});

export default InputField;
