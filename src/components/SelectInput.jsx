import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet, TouchableWithoutFeedback, TextInput, Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import colors from "../styles/colors";

// const { width } = Dimensions.get("window"); // Get screen width for styling

const SelectInput = ({
                       label,
                       options,
                       name,
                       icon,
                       value,
                       onValueChange,
                       placeholder,
                       required = false,
                       labelStyle,
                       style = {},
                     }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const selectRef = useRef(null);

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

  const toggleDropdown = useCallback(() => {
    setDropdownVisible(!dropdownVisible);
  }, [dropdownVisible]);

  const handleSelect = (option) => {
    onValueChange({ name, value: option });
    setDropdownVisible(false);
  };

  function getValue(value) {
    if (!value.label) {
      return options?.find(item => item.value === value.value)?.label;
    }
    return value.label;
  }

  return (
    <View style={[styles.root, style]}>
      <Animated.View style={[styles.container, { borderColor: animatedBorderColor }]}>
        {icon && icon}
        <View style={{ flex: 1 }}>

          <TouchableOpacity ref={selectRef} onPress={toggleDropdown} style={{ width: "100%" }}>

            <View>
              <View style={styles.labelRoot}>
                <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
                {required ? <Foundation name="asterisk" size={10} color={colors["red-300"]} /> : null}
              </View>

              <Icon style={styles.chevron} name="chevron-down-outline" size={20} color="#555" />

            </View>


            <Text style={styles.selectedText}>
              {value ? getValue(value) : placeholder}
            </Text>

          </TouchableOpacity>


        </View>
      </Animated.View>


      {dropdownVisible ? (
        <View style={[styles.dropdown, { width: selectRef.current?.offsetWidth }]}>
          <FlatList
            style={{ flex: 1 }}
            data={[{label: placeholder, value: ""}, ...options]}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: "relative",
  },
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
    position: "relative",
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

  inputFocused: {
    borderColor: colors["blue-purple-2"],
  },

  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(234,234,234,0.39)",
    borderRadius: 8,
    // width: "100%",
  },
  selectedText: {
    fontSize: 14,
    color: "#2f2f2f",
    paddingTop: 5,
    paddingBottom: 8,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(111,169,218,0.98)",
    maxHeight: 200,
    zIndex: 100000,
    elevation: 2, // For Android shadow
  },
  option: {
    paddingVertical: 6,
    left: 0,
    top: 0,
    width: "auto",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(111,169,218,0.98)",
  },
  optionText: {
    fontSize: 12,
    color: "#000",
  },

  chevron: {
    position: "absolute",
    right: 0,
    fontSize: 12,
    top: "50%",
    transform: [{
      translateY: 8,
    }],
  },
});

export default SelectInput;
