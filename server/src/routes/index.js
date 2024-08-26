import authRoute from "./authRoute";
import productRoute from "./productRoute";
import categoryRoute from "./categoryRoute";
import adminRoute from "src/routes/adminRoute";
import fileRoute from "src/routes/fileRoute";
import brandRoute from "src/routes/brandRoute";
import cartRoute from "src/routes/cartRoute";
import searchRoute from "src/routes/searchRoute";

const router = require("express").Router()

router.get("/", (req, res) => {
    res.send("Hello")
})

router.use("/api/v1/auth", authRoute)
router.use("/api/v1/search", searchRoute)
router.use("/api/v1/products", productRoute)
router.use("/api/v1/carts", cartRoute)
router.use("/api/v1/categories", categoryRoute)
router.use("/api/v1/admin", adminRoute)
router.use("/api/v1/files", fileRoute)
router.use("/api/v1/brands", brandRoute)

export default router

