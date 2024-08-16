import { StyleSheet, View } from "react-native";
import React from "react";
import colors from "../../styles/colors";


const Dot = ({ index, paginationIndex }) => {
  return (
    <View style={paginationIndex === index ? styles.dot : styles.dotOpacity} />
  );
};

export default Dot;

const styles = StyleSheet.create({
  dot: {
    backgroundColor: colors["gray-1"],
    height: 8,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 8,
  },
  dotOpacity: {
    backgroundColor: colors["gray-4"],
    height: 7,
    width: 7,
    marginHorizontal: 2,
    borderRadius: 8,
    opacity: 0.8,
  },
});
