
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Alert, RefreshControl } from "react-native";
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

const RolesList = () => {
  const { error, success } = useToast();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  async function fetchRoles() {
    try {
      setLoading(true);
      const res = await apis.get("/admin/roles");
      setRoles(res?.data?.data || []);
    } catch (ex) {
      error(catchAxiosError(ex));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await apis.delete(`/admin/roles/${id}`);
      setRoles(roles.filter(role => role.id !== id));
      success("Role deleted successfully");
    } catch (ex) {
      error(catchAxiosError(ex));
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.roleName}>{item.name}</Text>
        <Text style={styles.roleDescription}>{item.description}</Text>
      </View>
      <View style={styles.actions}>
        <RsButton style={styles.actionButton} onPress={() => navigation.navigate("AdminDashboard::UpdateRole", { roleId: item.id })}>
          <Icon name="pencil-outline" size={14} color="#fff" />
          <Text style={styles.actionText}>Edit</Text>
        </RsButton>
        <RsButton style={styles.actionButton} onPress={() => handleDelete(item.id)}>
          <Icon name="trash-outline" size={14} color="#fff" />
          <Text style={styles.actionText}>Delete</Text>
        </RsButton>
      </View>
    </View>
  );

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchRoles();
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
          <Text style={styles.headerTitle}>Roles</Text>
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
          data={roles}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <RsButton onPress={() => navigation.navigate("AdminDashboard::AddRole")} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Role</Text>
        </RsButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["background"], // Background color from theme
  },
  header: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors["headerBackground"], // Header background color from theme
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    color: colors["textPrimary"], // Primary text color from theme
    fontSize: 25,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors["textPrimary"], // Primary text color from theme
    marginLeft: 10,
  },
  searchIcon: {
    color: colors["textSecondary"], // Secondary text color from theme
  },
  listContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 10,
  },
  addButton: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: colors["primary"], // Primary color from theme
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  addButtonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors["border"], // Border color from theme
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 1,
  },
  itemDetails: {
    flex: 1,
  },
  roleName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors["textPrimary"], // Primary text color from theme
  },
  roleDescription: {
    fontSize: 14,
    color: colors["textSecondary"], // Secondary text color from theme
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: colors["primary"], // Primary color from theme
    marginLeft: 5,
  },
  actionText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 12,
  },
});

export default RolesList;
