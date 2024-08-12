import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions, TouchableWithoutFeedback,
} from "react-native";

export default function BottomSheet({
                                      isOpen,
                                      onClose,
                                      style = {},
                                      height = 100,
                                      backdropStyle = {},
  children
                                    }) {
  const bottomSheetHeight = height;
  const startPosition = height;

  // Position of the bottom sheet
  const position = useRef(new Animated.Value(startPosition)).current;

  // Interpolating the opacity of the backdrop based on the position of the bottom sheet
  const backdropOpacity = position.interpolate({
    inputRange: [height - bottomSheetHeight, startPosition],
    outputRange: [0.5, 0], // Adjust these values to control the opacity range
    extrapolate: "clamp",
  });

  // Open or close the bottom sheet
  const toggleBottomSheet = (open) => {
    const targetPosition = open ? height - bottomSheetHeight : startPosition;
    Animated.timing(position, {
      toValue: targetPosition,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // PanResponder to handle drag gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newPosition = height - bottomSheetHeight + gestureState.dy;
        if (newPosition > height - bottomSheetHeight && newPosition < height) {
          position.setValue(newPosition);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 50) {
          onClose(false);
          toggleBottomSheet(false);
        } else {
          onClose(true);
          toggleBottomSheet(true);
        }
      },
    }),
  ).current;

  useEffect(() => {
    toggleBottomSheet(isOpen);
  }, [isOpen]);

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          onClose(false);
          toggleBottomSheet(false);
        }}
      >
        <Animated.View
          style={[
            styles.backdrop,
            { opacity: backdropOpacity },
            backdropStyle,
          ]}
          pointerEvents={isOpen ? "auto" : "none"}
        />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.bottomSheet(height),
          { transform: [{ translateY: position }] },
          style,
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handle} />
        {children}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
  },
  bottomSheet: (height) => ({
    position: "absolute",
    width: "100%",
    left: 0,
    right: 0,
    height: height,
    bottom: 0,
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
  }),
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
