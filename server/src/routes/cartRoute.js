import express from "express";
import cartController from "src/controllers/cartController";

const router = express.Router();

// Add a product to the cart
router.post("/add", cartController.addToCart);

// Get cart items for a user
router.get("/:userId", cartController.getCart);

// Remove a product from the cart
router.delete("/remove", cartController.removeFromCart);

// Clear the entire cart for a user
router.delete("/clear", cartController.clearCart);

export default router;
