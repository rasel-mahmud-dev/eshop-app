
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import colors from "../styles/colors";

const LongTextComponent = ({ children, style={} }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={{...styles.longText, ...style}}>{children}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 16,
        backgroundColor: colors["gray-200"],
    },
    longText: {
        color: colors["primary-400"],
        fontSize: 16,
        lineHeight: 24,
    },
});

export default LongTextComponent;
