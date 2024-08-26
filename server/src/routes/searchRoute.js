import searchController from "src/controllers/SearchController";
import authController from "src/controllers/authController";

const router = require("express").Router();

// Get saved searches for a user
router.get("/", authController.protect, searchController.getSavedSearches);

// Save a new search
router.post("/", authController.protect, searchController.saveSearch);

// Delete a saved search
router.delete("/:searchId", authController.protect, searchController.deleteSearch);

export default router;

