import pool from "src/database";
import { makeHash } from "src/hash";
import User from "src/models/User";

class AuthController {
  getAdminDashboardSlats = async (req, res) => {
    try {
      const categoryCount = await pool.query("select count(id) from categories");
      const brandCount = await pool.query("select count(id) from brands");
      res.status(201).json({
        message: "User registered successfully", data: {
          categories: Number(categoryCount.rows?.[0]?.count || 0),
          brands: Number(brandCount.rows?.[0]?.count || 0),
        },
      });
    } catch (err) {
      res.status(500).json({ message: "Error registering user", error: err.message });
    }
  };
  getUsers = async (req, res) => {
    try {
      const { rows } = await pool.query("select * from users");
      res.status(200).json({
        message: "", data: rows,
      });
    } catch (err) {
      res.status(500).json({ message: "Error registering user", error: err.message });
    }
  };
  addUser = async (req, res) => {
    try {
      let result = await User.registration(req.body);
      res.status(201).json({ message: "User registered successfully", user: result });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error registering user", error: err.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [userId]);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully", data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ message: "Error deleting user", error: err.message });
    }
  };

  getRoles = async (req, res) => {
    try {
      const { rows } = await pool.query("select * from roles");
      res.status(200).json({
        message: "", data: rows,
      });
    } catch (err) {
      res.status(500).json({ message: "Error registering user", error: err.message });
    }
  };

  addRole = async (req, res) => {
    try {
      const { name, slug, description } = req.body;
      const existingRole = await pool.query("SELECT * FROM roles WHERE slug = $1", [slug]);
      if (existingRole.rows.length > 0) {
        return res.status(400).json({ message: "Role with this slug already exists" });
      }
      const result = await pool.query(
        "INSERT INTO roles (name, slug, description, created_at, updated_at, status) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'active') RETURNING *",
        [name, slug, description],
      );
      res.status(201).json({ message: "Role created successfully", data: result.rows[0] });
    } catch (err) {
      res.status(500).json({ message: "Error creating role", error: err.message });
    }
  };
  updateRole = async (req, res) => {
    try {
      const { roleId } = req.params;
      const { name, slug, description, status } = req.body;
      if (!roleId) {
        return res.status(400).json({ error: "Role ID is required" });
      }
      const values = [];
      let updateQuery = "UPDATE roles SET";

      if (name !== undefined) {
        updateQuery += ` name = $${values.length + 1},`;
        values.push(name);
      }

      if (description !== undefined) {
        updateQuery += ` description = $${values.length + 1},`;
        values.push(description);
      }
      if (status !== undefined) {
        updateQuery += ` status = $${values.length + 1},`;
        values.push(status);
      }

      if (values.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

      updateQuery = updateQuery.slice(0, -1); // Remove the trailing comma
      updateQuery += ` WHERE id = $${values.length + 1} RETURNING *;`;
      values.push(roleId);

      const result = await pool.query(updateQuery, values);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Role not found" });
      }

      res.status(200).json({
        message: "Role updated successfully",
        data: result.rows[0],
      });
    } catch (err) {
      res.status(500).json({ message: "Error updating role", error: err.message });

    }
  };
  deleteRole = async (req, res) => {
    try {
      const { roleId } = req.params;

      if (!roleId) {
        return res.status(400).json({ error: "Role ID is required" });
      }

      // Check if the role exists before trying to delete it
      const checkRoleQuery = "SELECT * FROM roles WHERE id = $1";
      const checkResult = await pool.query(checkRoleQuery, [roleId]);

      if (checkResult.rows.length === 0) {
        return res.status(404).json({ error: "Role not found" });
      }

      // Perform the deletion
      const deleteQuery = "DELETE FROM roles WHERE id = $1 RETURNING *";
      const deleteResult = await pool.query(deleteQuery, [roleId]);

      res.status(200).json({
        message: "Role deleted successfully",
        data: deleteResult.rows[0], // Return the deleted role data
      });
    } catch (err) {
      res.status(500).json({ message: "Error deleting role", error: err.message });
    }

  };
}

const authController = new AuthController();
export default authController;
