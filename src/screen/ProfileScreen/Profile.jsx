import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useAuthStore } from "../../store";
import colors from "../../styles/colors";
import RsButton from "../../components/RsButton/RsButton";
import Entypo from "react-native-vector-icons/Entypo";

const Profile = ({ navigation }) => {
  const { auth } = useAuthStore();
  const {
    username,
    email,
    first_name,
    last_name,
    address,
    city,
    state,
    postal_code,
    country,
    phone_number,
    created_at,
    deleted_at,
    role,
  } = auth || {};

  return (
    <>
      <View style={{ padding: 15, flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-small-left" style={{ color: "#1c1c1c", justifyContent: "center", fontSize: 25 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1c1c1c" }}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }} // Placeholder image
            style={styles.profileImage}
          />
          <Text style={styles.fullName}>{first_name} {last_name}</Text>
          <Text style={styles.username}>@{username}</Text>
          <RsButton style={styles.editButton}>
            Edit Profile
          </RsButton>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Contact Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{phone_number}</Text>
          </View>
          <Text style={styles.infoTitle}>Address</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoValue}>{address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>City:</Text>
            <Text style={styles.infoValue}>{city}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>State:</Text>
            <Text style={styles.infoValue}>{state}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Postal Code:</Text>
            <Text style={styles.infoValue}>{postal_code}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Country:</Text>
            <Text style={styles.infoValue}>{country}</Text>
          </View>
          <Text style={styles.infoTitle}>Account Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Role:</Text>
            <Text style={styles.infoValue}>{role}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Created At:</Text>
            <Text style={styles.infoValue}>{new Date(created_at).toLocaleDateString()}</Text>
          </View>
          {deleted_at && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Deleted At:</Text>
              <Text style={styles.infoValue}>{new Date(deleted_at).toLocaleDateString()}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors["background"],
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors["gray-18"],
    marginBottom: 10,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors["gray-14"],
  },
  username: {
    fontSize: 16,
    color: colors["gray-14"],
    marginBottom: 10,
  },
  editButton: {
    marginTop: 10,

  },
  editButtonText: {},
  infoContainer: {
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors["text-primary"],
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors["gray-14"],
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    color: colors["text-primary"],
    flex: 2,
  },
});

export default Profile;
