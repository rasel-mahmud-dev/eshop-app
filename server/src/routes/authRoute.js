import authController from "../controllers/authController";

// import {imageKitAuthenticationParameters} from "src/services/ImageKitUpload";

import express from "express";

const router = express.Router();


// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Protected route example
router.get('/protected', authController.protect, (req, res) => {
    res.send(`Hello, ${req.user.username}. You have access to this protected route.`);
});

// Route to verify token and get user info
router.get('/verify', authController.protect, (req, res) => {
    res.status(200).json({ message: 'Token is valid', user: req.user });
});


// router.get("/imagekit-authenticationEndpoint", auth, (req, res)=>{
//     let result = imageKitAuthenticationParameters()
//     res.status(200).send(result)
// })


export default router