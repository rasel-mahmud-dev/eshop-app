import authRoute from "./authRoute";
import productRoute from "./productRoute";

const router = require("express").Router()

router.get("/", (req, res) => {
    res.send("Hello")
})

router.use("/api/v1/auth", authRoute)
router.use("/api/v1/products", productRoute)

export default router

