import authRoute from "./authRoute";
import productRoute from "./productRoute";
import categoryRoute from "./categoryRoute";
import adminRoute from "src/routes/adminRoute";
import fileRoute from "src/routes/fileRoute";

const router = require("express").Router()

router.get("/", (req, res) => {
    res.send("Hello")
})

router.use("/api/v1/auth", authRoute)
router.use("/api/v1/products", productRoute)
router.use("/api/v1/categories", categoryRoute)
router.use("/api/v1/admin", adminRoute)
router.use("/api/v1/files", fileRoute)

export default router

