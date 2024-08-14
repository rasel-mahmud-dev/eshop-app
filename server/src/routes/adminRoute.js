import adminController from "src/controllers/adminController";

const router = require("express").Router();

router.get("/slats", adminController.getAdminDashboardSlats);
router.get("/users", adminController.getUsers);
router.post("/users", adminController.addUser);
router.delete("/users/:userId", adminController.deleteUser);
router.get("/roles", adminController.getRoles);
router.post("/roles", adminController.addRole);
router.patch("/roles/:roleId", adminController.updateRole);
router.delete("/roles/:roleId", adminController.deleteRole);

export default router;

