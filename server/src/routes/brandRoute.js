import express from "express";
import brandController from "src/controllers/brandController";

const router = express.Router();

router.post("/", brandController.create);
router.post("/import", brandController.importBatch);
router.get("/", brandController.getBrands);
router.delete("/", brandController.deleteAll);
router.delete("/:id", brandController.deleteItem);
router.patch("/:id", brandController.updateItem);

export default router;
