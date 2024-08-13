import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// const { width } = Dimensions.get("window"); // Get screen width for styling

const SelectInput = ({ label, options, name, value, onValueChange, placeholder }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const selectRef = useRef(null);

  const toggleDropdown = useCallback(() => {
    setDropdownVisible(!dropdownVisible);
  }, [dropdownVisible]);

  const handleSelect = (option) => {
    onValueChange({ name, value: option });
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.select}
        onPress={toggleDropdown}
        ref={selectRef}
      >
        <Text style={styles.selectedText}>
          {value ? value.label : placeholder}
        </Text>
        <Icon name="chevron-down-outline" size={20} color="#555" />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={[styles.dropdown, { width: selectRef.current?.offsetWidth }]}>
          <FlatList
            style={{ flex: 1 }}
            data={options}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    width: "100%",
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
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
    fontSize: 16,
    color: "#000",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(111,169,218,0.98)",
    maxHeight: 200,
    zIndex: 1,
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
});

export default SelectInput;
