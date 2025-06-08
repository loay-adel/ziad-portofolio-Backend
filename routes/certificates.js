// routes/certificateRoutes.js
const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateController");

router.get("/", certificateController.getAll);
router.post("/", certificateController.create);
router.patch("/:id", certificateController.update);
router.delete("/:id", certificateController.delete);

module.exports = router;
