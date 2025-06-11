// routes/aboutRoutes.js
const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutContoller");

router.get("/", aboutController.getAll);
router.post("/", aboutController.create);
router.patch("/:id", aboutController.update);
router.delete("/:id", aboutController.delete);

module.exports = router;
