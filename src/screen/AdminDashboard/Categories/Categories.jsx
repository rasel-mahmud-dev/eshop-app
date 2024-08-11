import React, { useCallback, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BottomSheet from "../../../components/BottomSheet/BottomSheet";
// import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const categories = [
  {
    id: 1,
    name: "Electronics",
    iconUrl: "https://5.imimg.com/data5/SELLER/Default/2023/3/292019880/YM/MK/PO/104903331/apple-iphone-14-pro-max-250x250.jpg",
  },
  {
    id: 2,
    name: "Fashion",
    iconUrl: "https://5.imimg.com/data5/SELLER/Default/2023/3/292019880/YM/MK/PO/104903331/apple-iphone-14-pro-max-250x250.jpg",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    iconUrl: "https://5.imimg.com/data5/SELLER/Default/2023/3/292019880/YM/MK/PO/104903331/apple-iphone-14-pro-max-250x250.jpg",
  },
  {
    id: 4,
    name: "Books",
    iconUrl: "https://5.imimg.com/data5/SELLER/Default/2023/3/292019880/YM/MK/PO/104903331/apple-iphone-14-pro-max-250x250.jpg",
  },
];

function CategoryListScreen({ navigation }) {

  const bottomSheetRef = useRef(null);
// callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.iconUrl }} style={styles.icon} />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CreateCategory")}
      >
        <Icon name="add-circle-outline" size={50} color="#1E90FF" />
      </TouchableOpacity>



      {/*<BottomSheet*/}
      {/*  ref={bottomSheetRef}*/}
      {/*  onChange={handleSheetChanges}*/}
      {/*>*/}
      {/*  <BottomSheetView style={styles.contentContainer}>*/}
      {/*    <Text>Awesome 🎉</Text>*/}
      {/*  </BottomSheetView>*/}
      {/*</BottomSheet>*/}

    </View>
      <BottomSheet>
        <Text>sdf</Text>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    padding: 15,
    marginHorizontal: 6,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  cardText: {
    fontSize: 18,
    color: "#333",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});

export default CategoryListScreen;
