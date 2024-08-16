
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomTabBar = ({ tabs, activeTab, onTabPress }) => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            activeTab === tab ? styles.activeTab : styles.inactiveTab
          ]}
          onPress={() => onTabPress(tab)}
        >
          <Text style={activeTab === tab ? styles.activeText : styles.inactiveText}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: "#1E90FF",
  },
  inactiveTab: {
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E90FF",
  },
  inactiveText: {
    fontSize: 14,
    color: "#666",
  },
});

export default CustomTabBar;
