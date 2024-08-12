import categoryController from "src/controllers/categoryController";

const router = require("express").Router();

router.post("/", categoryController.create);
router.post("/import", categoryController.importBatch);
router.get("/", categoryController.getCategories);
router.delete("/", categoryController.deleteAll);
router.get("/parent", categoryController.getParentCategories);
router.get("/sub-categories/:parentId", categoryController.getSubCategories);
router.delete("/parent/:parentId", categoryController.deleteParent);

export default router;

