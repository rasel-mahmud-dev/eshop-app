import categoryController from "src/controllers/categoryController";

const router = require("express").Router();

router.post("/", categoryController.create);
router.post("/category-config", categoryController.updateConfig);
router.get("/category-config", categoryController.getConfig);
router.post("/import", categoryController.importBatch);
router.get("/filter", categoryController.getCategoriesFilter);
router.post("/import-categories", categoryController.importCategory);
router.get("/", categoryController.getCategories);
router.get("/all", categoryController.getAllCategories);
router.delete("/", categoryController.deleteAll);
router.get("/parent", categoryController.getParentCategories);
router.get("/sub-categories/:parentId", categoryController.getSubCategories);
router.delete("/parent/:parentId", categoryController.deleteParent);
router.delete("/:id", categoryController.deleteItem);
router.patch("/:id", categoryController.updateItem);

export default router;


