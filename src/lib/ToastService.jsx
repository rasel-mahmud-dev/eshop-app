import React, { createContext, useContext, useRef, useState } from "react";
import {  Text, StyleSheet } from "react-native";
import Toast from "../components/Toast";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const toastRef = useRef(null);
  const [toastContent, setToastContent] = useState(null);

  const error = (content) => {
    setToastContent(content);
    if (toastRef.current) {
      toastRef.current.open();
    }
  };
  const success = (content) => {
    setToastContent(content);
    if (toastRef.current) {
      toastRef.current.open();
    }
  };

  return (
    <ToastContext.Provider value={{ error, success }}>
      {children}
      <Toast ref={toastRef}>{
        typeof toastContent === "string" ? <Text>{toastContent}</Text> : toastContent
      }</Toast>
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast
export const useToast = () => {
  return useContext(ToastContext);
};

const styles = StyleSheet.create({
  message: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
