import express from "express";
import cartController from "src/controllers/cartController";
import authController from "src/controllers/authController";

const router = express.Router();

router.get("/",  authController.protect, cartController.getCart);
router.post("/add",   authController.protect, cartController.addToCart);
router.delete("/remove",  authController.protect,  cartController.removeFromCart);
router.delete("/clear",  authController.protect,  cartController.clearCart);

export default router;
