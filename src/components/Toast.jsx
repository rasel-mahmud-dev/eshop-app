import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";

const { height: screenHeight } = Dimensions.get("window");

const Toast = forwardRef(({ message, duration = 3000, onClose, children = null }, ref) => {
  const [visible, setVisible] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const position = useRef(new Animated.Value(-screenHeight)).current;

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  useEffect(() => {
    if (visible) {
      Animated.timing(position, {
        toValue: 10,
        duration: 900,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(position, {
          toValue: -contentHeight,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false);
          if (onClose) onClose();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, contentHeight]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { transform: [{ translateY: position }] },
      ]}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        setContentHeight(height);
      }}
    >
      <View>
        {children ? children : <Text style={styles.message}>{message}</Text>}
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 10,
    left: 2,
    right: 2,
    backgroundColor: "rgb(255,53,53)",
    borderRadius: 4,
    padding: 10,
    zIndex: 1000,
  },
  message: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Toast;
