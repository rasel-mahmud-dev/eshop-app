import pool from "src/database";

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
}

const authController = new AuthController();
export default authController;
