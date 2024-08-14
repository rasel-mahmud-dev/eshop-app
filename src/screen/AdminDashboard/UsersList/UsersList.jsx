import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Image, Alert, RefreshControl } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useToast } from "../../../lib/ToastService";
import { apis } from "../../../apis";
import catchAxiosError from "../../../utils/catchAxiosError";
import Loader from "../../../components/Loader/Loader";
import RsButton from "../../../components/RsButton/RsButton";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../styles/colors";

const UsersList = () => {
  const { error, success } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  async function fetchUsers() {
    try {
      setLoading(true);
      const res = await apis.get("/admin/users");
      setUsers(res?.data?.data || []);
    } catch (ex) {
      error(catchAxiosError(ex));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await apis.delete(`/admin/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      success("User deleted successfully");
    } catch (ex) {
      error(catchAxiosError(ex));
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemImageContainer}>
        {/* Replace with user profile image if available */}
        <Image source={{ uri: item.profileImage || "https://via.placeholder.com/80" }} style={styles.userImage} />
      </View>
      <View style={styles.itemDetails}>
        <Text style={styles.userName}>{item.first_name} {item.last_name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userPhone}>{item.phone_number}</Text>
      </View>
      <View style={styles.actions}>
        <RsButton loginButton={styles.loginButton}
                  onPress={() => navigation.navigate("AdminDashboard::UpdateUser", { userId: item.id })}
                  style={styles.actionButton}>
          <Icon name="pencil-outline" size={14} color="#fff" />
          <Text style={styles.actionText}>Edit</Text>
        </RsButton>
        <RsButton loginButton={styles.loginButton} onPress={() => handleDelete(item.id)} style={styles.actionButton}>
          <Icon name="trash-outline" size={14} color="#fff" />
          <Text style={styles.actionText}>Delete</Text>
        </RsButton>
      </View>
    </View>
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchUsers();
    } catch (ex) {
      Alert.alert(catchAxiosError(ex));
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-small-left" style={styles.backButton} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Users</Text>
        </View>
        <AntDesign style={styles.searchIcon} name="search1" size={20} />
      </View>

      {loading && <Loader />}

      <View style={styles.listContainer}>
        <FlatList
          refreshControl={
            <RefreshControl
              progressBackgroundColor={"rgba(111,169,218,0.98)"}
              progressColor={"green"}
              colors={["#5851DB", "#C13584"]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <RsButton loginButton={{ width: "100%" }} onPress={() => navigation.navigate("AdminDashboard::AddUser")}
                  style={styles.addButton}>
          <Text style={styles.addButtonText}>Add User</Text>
        </RsButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    color: "#1c1c1c",
    fontSize: 25,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1c1c1c",
    marginLeft: 10,
  },
  searchIcon: {
    color: "#4f4f4f",
  },
  listContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 10,
  },
  addButton: {
    marginBottom: 0,
    margin: 0,
    padding: 0,
    backgroundColor: "#1E90FF",
  },
  addButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 10,
  },
  itemImageContainer: {
    marginRight: 10,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  itemDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors["gray-13"],
  },
  userEmail: {
    fontSize: 14,
    color: "#1E90FF",
  },
  userPhone: {
    fontSize: 12,
    color: "#555",
  },
  actions: {
    flexDirection: "row",
  },
  loginButton: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  actionButton: {
    paddingHorizontal: 5,
    backgroundColor: "#1E90FF",
    marginLeft: 5,
  },
  actionText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 10,
  },
});

export default UsersList;
