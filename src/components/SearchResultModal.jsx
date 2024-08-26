import React from "react";
import { FlatList, Modal, View, Text, StyleSheet, Dimensions } from "react-native";
import subStr from "../utils/subStr";

const SearchResultModal = ({ items, visible = true }) => {

  return visible && (
    <View style={styles.modal}>

      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Text style={styles.resultText}>
                {subStr(item.name, 40)}
              </Text>
            </View>
          )}
        />
      </View>

    </View>
  );
};
const { height: screenHeight } = Dimensions.get("window");


const styles = StyleSheet.create({
  modal: {},
  container: {
    backgroundColor: "white",
    position: "absolute",
    top: 60,
    width: "100%",
    height: screenHeight - 70,
    zIndex: 1,
  },

  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  resultText: {
    color: "#383838",
    fontSize: 14,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  paginationButton: {
    padding: 10,
  },
});

export default SearchResultModal;
