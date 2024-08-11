// src/components/Checkbox.js

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../styles/colors";
import Icon from "react-native-vector-icons/FontAwesome"; // Assuming you have FontAwesome icons imported

const CheckBox = ({ label, checked, onChange }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onChange}>
            <View style={styles.checkbox}>
                {checked && <Icon name="check-square-o" size={20} color={colors["primary-400"]} />}
                {!checked && <Icon name="square-o" size={20} color={colors["gray-400"]} />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: colors["primary-400"],
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    label: {
        fontSize: 16,
        color: colors["gray-700"],
    },
});

export default CheckBox;
