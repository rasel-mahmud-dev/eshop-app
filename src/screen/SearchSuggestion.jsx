import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, FlatList } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import colors from "../styles/colors";

function SearchSuggestion({ navigation }) {
  const [searchCriteria, setSearchCriteria] = useState("");
  const [savedSearches, setSavedSearches] = useState([]);

  const searchCriteriaRef = useRef()

  useEffect(() => {
    fetchSavedSearches();
    searchCriteriaRef?.current?.focus()
  }, []);

  const fetchSavedSearches = async () => {
    const response = await fetch("/api/saved-searches/1"); // Assuming user ID is 1
    const data = await response.json();
    setSavedSearches(data);
  };

  const handleSaveSearch = async () => {
    const newSearch = { searchCriteria };
    await fetch("/api/saved-searches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSearch),
    });
    fetchSavedSearches(); // Refresh the list of saved searches
  };

  const handleDeleteSearch = async (searchId) => {
    await fetch(`/api/saved-searches/${searchId}`, { method: "DELETE" });
    fetchSavedSearches(); // Refresh the list after deletion
  };

  const renderSavedSearch = ({ item }) => (
    <View style={styles.savedSearchItem}>
      <Text style={styles.searchText}>{item.searchCriteria}</Text>
      <TouchableOpacity onPress={() => handleDeleteSearch(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>


      <ScrollView style={styles.containerScroll}>

        <View style={styles.searchBar}>
          <TextInput
            ref={searchCriteriaRef}
            placeholderTextColor={colors["gray-8"]}
            style={styles.searchBarInput}
            placeholder="Enter search criteria..."
            value={searchCriteria}
            onChangeText={setSearchCriteria}
          />
          <View style={styles.searchBarIconWrapper}>
            <AntDesign name={"search1"} style={styles.searchBarIcon} />
          </View>
        </View>

        {/*<TouchableOpacity onPress={handleSaveSearch} style={styles.saveButton}>*/}
        {/*  <Text style={styles.saveButtonText}>Save Search</Text>*/}
        {/*</TouchableOpacity>*/}

        <Text style={styles.savedSearchesTitle}>Saved Searches</Text>
        <FlatList
          data={savedSearches}
          renderItem={renderSavedSearch}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },


  searchBar: {
    flex: 1,
    // marginLeft: 10,
    backgroundColor: "#fff",
    // paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors["primary-400"],
    height: 40,
    overflow: "hidden",
  },
  searchBarInput: {
    backgroundColor: "transparent",
    color: colors["gray-14"],
    fontWeight: "500",
  },
  searchBarText: {
    fontWeight: "500",
    color: colors["gray-14"],
  },
  searchBarIconWrapper: {
    position: "absolute",
    right: 0,
    height: 45,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(76,178,90,0.25)",
  },
  searchBarIcon: {
    color: colors["primary-400"],
    fontSize: 20,
  },

  containerScroll: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  saveButton: {
    backgroundColor: "#f36f3e",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  savedSearchesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  savedSearchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
  },
  searchText: {
    fontSize: 16,
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default SearchSuggestion;
