import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  FlatList,

} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import colors from "../styles/colors";
import { apis, setAuthorization } from "../apis";
import useReducer from "../hooks/useReducer";
import SearchResultModal from "../components/SearchResultModal";
import useDebounce from "../hooks/useDebounce";
import Feather from "react-native-vector-icons/Feather";

function SearchSuggestion({ navigation }) {
  const [savedSearches, setSavedSearches] = useState([]);

  const [resultResult, setResultResult] = useReducer({
    items: [],
    total: 0,
    isLoading: false,
    isOpen: false,
    searchText: "",
  });


  const debounchedFn = useDebounce(handleSearchProduct, 500);

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
    // handleSaveSearch();
    setResultResult({
      searchText: "",
      isLoading: false,
      isOpen: false,
    });
  }

  function handleChangeSearchText(value) {
    const searchState = { searchText: value };
    if (!value) {
      searchState["isLoading"] = false;
      searchState["isOpen"] = false;
      searchState["searchText"] = "";
      searchState["items"] = [];
      setResultResult(searchState);
    } else {
      searchState["isOpen"] = true;
      searchState["isLoading"] = true;
      setResultResult(searchState);
      debounchedFn(value);
    }
  }

  async function handleSearchProduct(text) {
    try {
      const { data } = await apis.get(`/products/search/${text}`);
      const result = data?.data;
      result && setResultResult(result);

    } catch (ex) {
      console.log(ex);
    } finally {
      setResultResult({ isLoading: false });
    }
  }

  async function handleSearchFromRecentSearch(item) {
    try {
      const searchText = item.search_criteria;
      if (searchText) {
        const searchState = { searchText };
        searchState["isOpen"] = true;
        searchState["isLoading"] = true;
        setResultResult(searchState);
        handleSearchProduct(searchText);
      }

    } catch (ex) {

    }
  }

  const renderSavedSearch = ({ item }) => (
    <TouchableOpacity onPress={() => handleSearchFromRecentSearch(item)} style={styles.savedSearchItem}>
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <AntDesign name="search1" style={styles.searchButton} />
        <Text style={styles.searchText}>{item.search_criteria}</Text>
      </View>
      <Feather style={styles.arrow} name="arrow-up-left" size={16} />
    </TouchableOpacity>
  );

  return (
    <>
      <SearchResultModal visible={resultResult.isOpen} isLoading={resultResult.isLoading} items={resultResult.items} />
      <View style={styles.container}>

        <ScrollView style={styles.containerScroll}>

          <View style={styles.searchBar}>
            <TextInput
              ref={searchCriteriaRef}
              placeholderTextColor={colors["gray-8"]}
              style={styles.searchBarInput}
              placeholder="Enter search criteria..."
              value={resultResult?.searchText}
              onChangeText={handleChangeSearchText}
            />
            <TouchableOpacity onPress={handleSearch} style={styles.searchBarIconWrapper}>
              {resultResult.searchText ? <AntDesign name={"close"} style={styles.searchBarIcon} /> :
                <AntDesign name={"search1"} style={styles.searchBarIcon} />}
            </TouchableOpacity>
          </View>

          <Text style={styles.savedSearchesTitle}>Search history</Text>

          <FlatList
            data={savedSearches}
            renderItem={renderSavedSearch}
            keyExtractor={(item) => item?.id?.toString()}
          />
        </ScrollView>

      </View>
    </>
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
    // backgroundColor: colors["primary-400"],
  },
  searchBarIcon: {
    color: colors["gray-20"],
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
    justifyContent: "space-between",
  },
  searchText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#505050",
  },
  arrow: {
    color: colors["gray-9"],
    fontSize: 14,
  },
  searchButton: {
    color: "#9f9f9f",
    fontSize: 18,
    padding: 5,
    borderRadius: 5,
  },
});

export default SearchSuggestion;
