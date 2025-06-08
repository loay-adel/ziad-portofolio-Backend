// routes/researchPaperRoutes.js
const express = require("express");
const router = express.Router();
const researchPaperController = require("../controllers/researchPaperController");

router.get("/", researchPaperController.getAll);
router.post("/", researchPaperController.create);
router.patch("/:id", researchPaperController.update);
router.delete("/:id", researchPaperController.delete);

module.exports = router;
