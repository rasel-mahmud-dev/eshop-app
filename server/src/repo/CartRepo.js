import pool from "src/database";

class Cart {
  async getItems(userId) {
    const { rows } = await pool.query(`SELECT ci.id, ci.quantity, p.title, p.price, p.image
                                       FROM carts ci
                                                JOIN products p ON ci.product_id = p.id
                                       WHERE ci.user_id = $1`, [userId]);

    return rows;
  }
}

const cartRepo = new Cart();

export default cartRepo;
