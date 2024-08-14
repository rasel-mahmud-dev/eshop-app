import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

const Drawer = ({ children, maxWidth=0, onClose, isOpen, sidebarStyle = {} }) => {
  const translateX = useRef(new Animated.Value(width)).current;
  const lastOffset = useRef({ x: 0 });

  useEffect(() => {
    if (isOpen) {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateX, {
        toValue: width,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  const handleGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true },
  );

  const handleGestureStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let toValue = 0;
      if (nativeEvent.translationX < width * 0.2) {
        toValue = width;
        onClose();
      }

      lastOffset.current.x = toValue;
      Animated.spring(translateX, {
        toValue,
        useNativeDriver: true,
      }).start();
    }
  };

  const animatedStyle = {
    transform: [
      {
        translateX: translateX.interpolate({
          inputRange: [0, width],
          outputRange: [0, width],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {isOpen && <TouchableOpacity style={styles.backdrop} onPress={onClose} />}
      <PanGestureHandler
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={handleGestureStateChange}
      >
        <Animated.View style={[styles.sidebar(maxWidth), sidebarStyle, animatedStyle]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // height: "100%",
    // flex: 1,
    // backgroundColor: colors["red-300"]

  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 9,
  },
  sidebar: (maxWidth)=>({
    zIndex: 10,
    height: "100%",
    padding: 20,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: maxWidth ? maxWidth : width * 0.8,
    backgroundColor: "#6b4fb5",
    // shadowColor: '#000',
    // shadowOffset: { width: -2, height: 0 },
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    // elevation: 5,
  }),
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Drawer;
