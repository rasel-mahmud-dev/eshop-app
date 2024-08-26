import React from "react";
import { FlatList, View, Text, StyleSheet, Dimensions, Image } from "react-native";
import subStr from "../utils/subStr";
import colors from "../styles/colors";
import AntDesign from "react-native-vector-icons/AntDesign";
import Loader from "./Loader/Loader";

const SearchResultModal = ({ items, isLoading, visible = true }) => {

  return visible && (
    <View style={styles.modal}>
      <View style={styles.container}>

        {isLoading && <Loader />}

        {!items?.length && !isLoading && <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: colors["gray-20"], textAlign: "center" }}>Not match any
            items</Text>
        </View>}

        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              {item.image ? <Image style={styles.resultImage} source={{ uri: item.image }} /> :
                <AntDesign style={styles.resultIcon} name="search1" />}
              <View style={styles.textWrapper}>
                <Text style={styles.resultText}>
                  {subStr(item.name, 40)}
                </Text>
                <Text style={styles.resultTypeText}>In {item?.type} </Text>
              </View>
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
    padding: 10,
  },

  resultItem: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    columnGap: 5,
  },
  textWrapper: {
    justifyContent: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(204,204,204,0.37)",
    width: "100%",
  },
  resultImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  resultIcon: {
    fontSize: 20,
    width: 40,
    color: colors["gray-14"],
  },

  resultTypeText: {
    color: colors["primary-400"],
    fontSize: 14,
  },
  resultText: {
    color: colors["gray-20"],
    fontSize: 13,
    fontWeight: "500",
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
