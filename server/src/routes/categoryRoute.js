import categoryController from "src/controllers/categoryController";

const router = require("express").Router();

router.post("/", categoryController.create);
router.post("/import", categoryController.importBatch);
router.get("/", categoryController.getCategories);
router.get("/all", categoryController.getAllCategories);
router.delete("/", categoryController.deleteAll);
router.get("/parent", categoryController.getParentCategories);
router.get("/sub-categories/:parentId", categoryController.getSubCategories);
router.delete("/parent/:parentId", categoryController.deleteParent);
router.delete("/:id", categoryController.deleteItem);
router.patch("/:id", categoryController.updateItem);

export default router;


