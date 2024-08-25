import pool from "src/database";
import cartRepo from "src/repo/CartRepo";

class CartController {
  addToCart = async (req, res) => {
    const client = await pool.connect();
    const userId = req.user.id;

    try {
      const { productId, quantity = 1 } = req.body;

      if (!userId || !productId) {
        return res.status(400).json({ error: "userId, productId, and quantity are required" });
      }

      await client.query("BEGIN");

      // Check if the product exists
      const productResult = await client.query(`SELECT id, price
                                                FROM products
                                                WHERE id = $1`, [productId]);

      if (productResult.rows.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      const product = productResult.rows[0];

      // Check if the cart item already exists
      const cartItemResult = await client.query(`SELECT id, quantity
                                                 FROM carts
                                                 WHERE user_id = $1
                                                   AND product_id = $2`, [userId, productId]);

      if (cartItemResult.rows.length > 0) {
        const newQuantity = cartItemResult.rows[0].quantity + quantity;
        await client.query(`UPDATE carts
                            SET quantity = $1
                            WHERE id = $2`, [newQuantity, cartItemResult.rows[0].id]);
      } else {
        await client.query(`INSERT INTO carts(user_id, product_id, quantity)
                            VALUES ($1, $2, $3)`, [userId, productId, quantity]);
      }

      await client.query("COMMIT");
      res.status(201).json({ message: "Product added to cart successfully" });

    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: "An error occurred while adding to the cart" });
    } finally {
      client.release();
    }
  };

  getCart = async (req, res) => {
    try {
      const userId = req.user.id;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      const rows = await cartRepo.getItems(userId);
      res.status(200).json({ data: rows });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "An error occurred while fetching the cart" });
    }
  };

  removeFromCart = async (req, res) => {
    const client = await pool.connect();
    try {
      const userId = req.user.id;
      const { productId } = req.body;

      if (!userId || !productId) {
        return res.status(400).json({ error: "userId and productId are required" });
      }

      const result = await client.query(`DELETE
                                         FROM carts
                                         WHERE user_id = $1
                                           AND product_id = $2
                                         RETURNING id`, [userId, productId]);

      if (!result.rowCount) {
        return res.status(404).json({
          message: "Item not found in cart", data: {},
        });
      }
      res.status(200).json({ message: "Item removed from cart successfully" });

    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ error: "An error occurred while removing the item from the cart" });
    } finally {
      client.release();
    }
  };

  clearCart = async (req, res) => {
    const client = await pool.connect();
    try {
      const userId = req.user.id;

      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }

      const result = await client.query(`DELETE
                                         FROM carts
                                         WHERE user_id = $1
                                         RETURNING id`, [userId]);

      if (!result.rowCount) {
        return res.status(404).json({
          message: "Cart is already empty", data: {},
        });
      }
      res.status(200).json({ message: "Cart cleared successfully" });

    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ error: "An error occurred while clearing the cart" });
    } finally {
      client.release();
    }
  };
}

const cartController = new CartController();
export default cartController;
