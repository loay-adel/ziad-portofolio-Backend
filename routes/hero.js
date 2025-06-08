// routes/heroRoutes.js
const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroController");

router.get("/", heroController.getAll);
router.post("/", heroController.create);
router.patch("/:id", heroController.update);
router.delete("/:id", heroController.delete);

module.exports = router;
