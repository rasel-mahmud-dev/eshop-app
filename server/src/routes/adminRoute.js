import adminController from "src/controllers/adminController";

const router = require("express").Router();

router.get("/slats", adminController.getAdminDashboardSlats);
router.get("/users", adminController.getUsers);

export default router;

