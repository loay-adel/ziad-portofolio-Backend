// routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/", courseController.getAll);
router.post("/", courseController.create);
router.patch("/:id", courseController.update);
router.delete("/:id", courseController.delete);

module.exports = router;
