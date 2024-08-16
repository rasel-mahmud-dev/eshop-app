import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import icons

export const tabs = [
  { name: "For You", id: 1, icon: "heart-outline" }, // Add icon names
  { name: "Free Delivery", id: 2, icon: "truck-outline" },
  { name: "Buy More Save More", id: 3, icon: "cart-outline" },
  { name: "New Arrival", id: 4, icon: "star-outline" },
  { name: "Best Price Guaranteed", id: 5, icon: "tag-outline" },
  { name: "Coins", id: 6, icon: "coin-outline" },
];

function Tabs({ activeTab, setActiveTab }) {

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        {tabs.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.tab,
              activeTab === index && styles.activeTab,
            ]}
            onPress={() => setActiveTab(index)}
          >
            <Icon
              name={item.icon}
              size={16}
              color={activeTab === index ? "#007AFF" : "#555"}
            />
            <Text style={[
              styles.tabText,
              activeTab === index && styles.activeTabText,
            ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/*<View style={styles.content}>*/}
      {/*  {activeTab === 0 && <Text>Content for "For You"</Text>}*/}
      {/*  {activeTab === 1 && <Text>Content for "Free Delivery"</Text>}*/}
      {/*  {activeTab === 2 && <Text>Content for "Buy More Save More"</Text>}*/}
      {/*  {activeTab === 3 && <Text>Content for "New Arrival"</Text>}*/}
      {/*  {activeTab === 4 && <Text>Content for "Best Price Guaranteed"</Text>}*/}
      {/*  {activeTab === 5 && <Text>Content for "Coins"</Text>}*/}
      {/*</View>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tab: {
    flexDirection: "row", // Arrange icon and text vertically
    alignItems: "center",
    // justifyContent: "center",
    paddingHorizontal: 10,
    columnGap: 4
  },
  activeTab: {
    borderBottomWidth: 1,
    borderColor: "#007AFF",
  },
  tabText: {
    color: "#797979",
    fontSize: 13,
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
});

export default Tabs;
