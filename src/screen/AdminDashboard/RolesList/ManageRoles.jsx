import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Alert } from "react-native";
import { useToast } from "../../../lib/ToastService";
import { apis } from "../../../apis";
import catchAxiosError from "../../../utils/catchAxiosError";
import Loader from "../../../components/Loader/Loader";
import RsButton from "../../../components/RsButton/RsButton";
import colors from "../../../styles/colors";
// import CheckBox from "@react-native-community/checkbox";

const ManageRoles = () => {
  const { error, success } = useToast();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

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

  async function fetchRoles() {
    try {
      const res = await apis.get("/admin/roles");
      setRoles(res?.data?.data || []);
    } catch (ex) {
      error(catchAxiosError(ex));
    }
  }

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setPermissions(user.permissions || []);
  };

  const handleRoleAssign = async (roleId) => {
    try {
      await apis.post(`/admin/users/${selectedUser.id}/assign-role`, { roleId });
      success("Role assigned successfully");
      fetchUsers(); // Refresh user data
    } catch (ex) {
      error(catchAxiosError(ex));
    }
  };

  const handlePermissionToggle = (permission) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((perm) => perm !== permission)
        : [...prev, permission]
    );
  };

  const savePermissions = async () => {
    try {
      await apis.post(`/admin/users/${selectedUser.id}/set-permissions`, { permissions });
      success("Permissions updated successfully");
    } catch (ex) {
      error(catchAxiosError(ex));
    }
  };

  const renderUserItem = ({ item }) => (
    <TouchableOpacity style={styles.userItem} onPress={() => handleUserSelect(item)}>
      <Text style={styles.userName}>{item.name}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </TouchableOpacity>
  );

  const renderRoleItem = ({ item }) => (
    <TouchableOpacity style={styles.roleItem} onPress={() => handleRoleAssign(item.id)}>
      <Text style={styles.roleName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading && <Loader />}
      <View style={styles.userListContainer}>
        <Text style={styles.title}>Users</Text>
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={styles.detailsContainer}>
        {selectedUser && (
          <>
            <Text style={styles.title}>{selectedUser.name}'s Roles</Text>
            <FlatList
              data={roles}
              renderItem={renderRoleItem}
              keyExtractor={(item) => item.id.toString()}
            />
            <Text style={styles.title}>Permissions</Text>
            <ScrollView>
              {["Read", "Write", "Execute"].map((perm) => (
                <View key={perm} style={styles.permissionItem}>
                  {/*<CheckBox*/}
                  {/*  value={permissions.includes(perm)}*/}
                  {/*  onValueChange={() => handlePermissionToggle(perm)}*/}
                  {/*/>*/}
                  <Text style={styles.permissionText}>{perm}</Text>
                </View>
              ))}
            </ScrollView>
            <RsButton
              loginButton={{ width: "100%" }}
              onPress={savePermissions}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Save Permissions</Text>
            </RsButton>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  userListContainer: {
    width: "30%",
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: "#E0E0E0",
  },
  detailsContainer: {
    width: "70%",
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  userName: {
    fontSize: 16,
    color: colors["gray-13"],
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
  },
  roleItem: {
    padding: 10,
    backgroundColor: "#F0F0F0",
    marginBottom: 5,
  },
  roleName: {
    fontSize: 16,
    color: colors["gray-13"],
  },
  permissionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  permissionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#1E90FF",
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ManageRoles;
