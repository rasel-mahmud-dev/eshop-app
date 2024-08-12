import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { usePromptStore } from "../store";

const CenteredPrompt = ({ id = "", onClose, onConfirm, message }) => {
  const { setOpen, openIds, setClose } = usePromptStore();

  function handleClose(id) {
    setOpen(id);
    setClose(id);
  }

  return (
    <Modal
      transparent
      visible={openIds.includes(id)}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        handleClose();
      }}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalMessage}>{message}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleClose} style={styles.button}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.confirmButton]}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ddd",
    marginHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: "#1E90FF",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default CenteredPrompt;
