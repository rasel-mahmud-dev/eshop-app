import adminController from "src/controllers/adminController";

const router = require("express").Router();

router.get("/slats", adminController.getAdminDashboardSlats);
router.get("/users", adminController.getUsers);
router.get("/roles", adminController.getRoles);

export default router;

