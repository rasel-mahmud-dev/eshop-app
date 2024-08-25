import authController from "../controllers/authController";

// import {imageKitAuthenticationParameters} from "src/services/ImageKitUpload";

import express from "express";
import cartRepo from "src/repo/CartRepo";

const router = express.Router();


// Register route
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);

// Protected route example
router.get("/protected", authController.protect, (req, res) => {
  res.send(`Hello, ${req.user.username}. You have access to this protected route.`);
});

router.get("/verify", authController.protect, async (req, res) => {
  const cartItems = await cartRepo.getItems(req.user.id);
  res.status(200).json({ message: "Token is valid", data: { user: req.user, cartItems } });
});


export default router;
