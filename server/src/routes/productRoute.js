import express from "express";
import productController from "src/controllers/productController";

const router = express.Router();

// Create a new product
router.post("/", productController.create);

// Import products in bulk
router.post("/import", productController.importBatch);

// Get all products
router.get("/", productController.getProducts);

// Get a specific product by ID
router.get("/:id", productController.getProductById);

// Delete all products
router.delete("/", productController.deleteAll);

// Delete a specific product by ID
router.delete("/:id", productController.deleteItem);

// Update a specific product by ID
router.patch("/:id", productController.updateItem);

// Search suggestion
router.get("/search/:searchText", productController.getSearchProduct);

export default router;
