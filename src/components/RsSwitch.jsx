
import React from 'react';
import {  TouchableOpacity, Animated, StyleSheet } from 'react-native';
import colors from "../styles/colors";

const RsSwitch = ({ value, onValueChange, style, name, readOnly }) => {
    const translateX = React.useRef(new Animated.Value(value ? 20 : 0)).current;

    React.useEffect(() => {
        Animated.timing(translateX, {
            toValue: value ? 20 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [value]);

    return (
        <TouchableOpacity
            style={[styles.container, style, value ? styles.containerActive : styles.containerInactive]}
            onPress={() => readOnly ? null : onValueChange({value: !value, name})}
            activeOpacity={0.7}
        >
            <Animated.View style={[styles.circle, { transform: [{ translateX }] }]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 45,
        height: 25,
        borderRadius: 12,
        justifyContent: 'center',
        padding: 2,
        backgroundColor: '#ddd',
    },
    containerActive: {
        backgroundColor: colors["primary-400"],
    },
    containerInactive: {
        backgroundColor: '#ddd',
    },
    circle: {
        width: 22,
        height: 22,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 3,
    },
});

export default RsSwitch;
