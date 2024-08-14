import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Drawer from "./Drawer";

const AdminDashboardSidebar = ({ isOpen, onClose, items, onSelectItem, activeItem }) => {
  return (
    <Drawer maxWidth={250} isOpen={isOpen} onClose={() => onClose(false)}>
      {items.map((item) => (
        <TouchableOpacity key={item.id}
                          style={[
                            styles.sidebarItem,
                            { backgroundColor: activeItem?.id === item.id ? "#e0e0e0" : "transparent" },
                          ]}
                          onPress={() => {
                            onSelectItem(item);
                            onClose();
                          }}
        >
          {item.icon()}
          <Text style={styles.sidebarItemText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Adjust background color as needed
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  sidebarItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#000", // Adjust text color as needed
  },
});

export default AdminDashboardSidebar;
