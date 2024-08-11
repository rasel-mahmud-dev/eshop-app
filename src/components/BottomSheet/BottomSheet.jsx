import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const height = 1000;

export default function BottomSheet() {
  const bottomSheetHeight = height; // Height of the bottom sheet (50% of screen height)
  const startPosition = height; // Starting position of the bottom sheet (off-screen)

  // Position of the bottom sheet
  const position = useRef(new Animated.Value(startPosition)).current;

  // Open or close the bottom sheet
  const toggleBottomSheet = (open) => {

    let a = open ? height - bottomSheetHeight : startPosition;
    console.log(a);
    Animated.timing(position, {
      toValue: a,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // PanResponder to handle drag gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Calculate new position
        const newPosition = height - bottomSheetHeight + gestureState.dy;
        if (newPosition > height - bottomSheetHeight && newPosition < height) {
          position.setValue(newPosition);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Determine whether to open or close the bottom sheet based on the gesture
        if (gestureState.dy > 50) {
          toggleBottomSheet(false);
        } else {
          toggleBottomSheet(true);
        }
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => toggleBottomSheet(true)}>
        <Text style={styles.openButtonText}>Open Bottom Sheet</Text>
      </TouchableOpacity>

      <Animated.View
        style={[styles.bottomSheet, { transform: [{ translateY: position }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handle} />
        <Text style={styles.sheetTitle}>Custom Bottom Sheet</Text>
        <Text style={styles.sheetContent}>Here is some content...</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  openButtonText: {
    fontSize: 18,
    color: "#007BFF",
  },
  bottomSheet: {
    position: "absolute",
    width: "100%",
    left: 0,
    right: 0,
    height: height * 0.5,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 10,
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sheetContent: {
    fontSize: 16,
    color: "#555",
  },
});
