import pool from "src/database";

class AuthController {
  getAdminDashboardSlats = async (req, res) => {
    try {
      const categoryCount = await pool.query("select count(id) from categories");
      res.status(201).json({
        message: "User registered successfully", data: {
          categories: Number( categoryCount.rows?.[0]?.count || 0),
        },
      });
    } catch (err) {
      res.status(500).json({ message: "Error registering user", error: err.message });
    }
  };
}

const authController = new AuthController();
export default authController;
