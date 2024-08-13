import fileController from "src/controllers/fileController";

const router = require("express").Router();

router.post("/", fileController.uploadFile);

export default router;

