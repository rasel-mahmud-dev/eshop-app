import categoryController from "src/controllers/categoryController";

const router = require("express").Router();

router.post("/import", categoryController.importBatch)
router.get("/", categoryController.getCategories)
router.delete("/", categoryController.deleteAll)
router.get("/parent", categoryController.getParentCategories)

export default router

