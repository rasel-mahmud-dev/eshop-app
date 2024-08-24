import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Animated } from "react-native";
import colors from "../styles/colors";
import Foundation from "react-native-vector-icons/Foundation";

const InputField = ({ label, required, name, onChangeText, icon, labelStyle = {}, multiline = false, ...props }) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = useRef(new Animated.Value(0)).current;
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    Animated.timing(borderColor, {
      toValue: isFocused ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [isFocused, borderColor]);


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const animatedBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: [`rgba(255, 0, 0, 0)`, `rgba(147, 105, 224, 0.98)`],
  });
  return (
    <Animated.View style={[styles.container, { borderColor: animatedBorderColor }]}>
      {icon && icon}

      <View style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={focusInput}>
          <View style={styles.labelRoot}>
            <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
            {required ? <Foundation name="asterisk" size={10} color={colors["red-300"]} /> : null}
          </View>
        </TouchableWithoutFeedback>

        <TextInput
          {...props}
          ref={inputRef} r
          multiline={multiline}
          style={[styles.input(multiline), isFocused && styles.inputFocused]}
          placeholderTextColor={colors["gray-10"]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={(t) => onChangeText({ name, value: t })}
        />
      </View>
    </Animated.View>

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
    borderWidth: 1,
    borderColor: "rgba(90, 151, 203, 0.98)",
  },
  containerFocused: {
    borderColor: colors["blue-300"],
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
    marginTop: -8,
    borderRadius: 8,
    borderWidth: 0,
    marginLeft: -4,
    color: "#000",
  }),
  inputFocused: {
    borderColor: colors["blue-purple-2"],
  },
});

export default InputField;
