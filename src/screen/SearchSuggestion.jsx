import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, FlatList } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import colors from "../styles/colors";
import { apis, setAuthorization } from "../apis";

function SearchSuggestion({ navigation }) {
  const [searchCriteria, setSearchCriteria] = useState("");
  const [savedSearches, setSavedSearches] = useState([]);

  const searchCriteriaRef = useRef();

  useEffect(() => {
    fetchSavedSearches();
    searchCriteriaRef?.current?.focus();
  }, []);

  const fetchSavedSearches = async () => {
    await setAuthorization();
    const { data } = await apis.get("/search");
    const items = data?.data;
    items && setSavedSearches(items);
  };

  function handleSearch() {
    // setSavedSearches(prevState => ([...prevState, savedSearches]));
    handleSaveSearch();

  }

  const handleSaveSearch = async () => {
    const newSearch = { searchCriteria };
    await apis.post("/search", newSearch);
    fetchSavedSearches();
  };

  const handleDeleteSearch = async (searchId) => {
    await setAuthorization();
    await apis.delete(`/search/${searchId}`);
  };

  const renderSavedSearch = ({ item }) => (
    <TouchableOpacity style={styles.savedSearchItem}>
      <AntDesign name="search1" style={styles.searchButton} />
      <Text style={styles.searchText}>{item.search_criteria}</Text>
    </TouchableOpacity>
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
          <TouchableOpacity onPress={handleSearch} style={styles.searchBarIconWrapper}>
            <AntDesign name={"search1"} style={styles.searchBarIcon} />
          </TouchableOpacity>
        </View>

        {/*<TouchableOpacity onPress={handleSaveSearch} style={styles.saveButton}>*/}
        {/*  <Text style={styles.saveButtonText}>Save Search</Text>*/}
        {/*</TouchableOpacity>*/}

        <Text style={styles.savedSearchesTitle}>Search history</Text>

        <FlatList
          data={savedSearches}
          renderItem={renderSavedSearch}
          keyExtractor={(item) => item?.id?.toString()}
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
    backgroundColor: "#ffffff",
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors["primary-400"],
    // height: 40,
    overflow: "hidden",
  },
  searchBarInput: {
    backgroundColor: "transparent",
    color: colors["gray-14"],
    fontWeight: "500",
    width: "100%",
    overflow: "hidden",
    paddingVertical: 6,
  },
  searchBarText: {
    fontWeight: "500",
    color: colors["gray-14"],
  },
  searchBarIconWrapper: {
    position: "absolute",
    right: 0,
    height: 42,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors["primary-400"],
  },
  searchBarIcon: {
    color: colors["gray-0"],
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
    color: "#ff4444",
    fontSize: 18,
    fontWeight: "bold",
  },
  savedSearchesTitle: {
    color: colors["gray-16"],
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 10,
  },
  savedSearchItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 4,
    marginBottom: 4,
    backgroundColor: "rgba(199,199,199,0.07)",
    borderRadius: 6,
  },
  searchText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#505050",
  },
  searchButton: {
    color: "#9f9f9f",
    fontSize: 18,
    padding: 5,
    borderRadius: 5,
  },

});

export default SearchSuggestion;
