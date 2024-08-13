import adminController from "src/controllers/adminController";

const router = require("express").Router();

router.get("/slats", adminController.getAdminDashboardSlats);

export default router;

