// routes/dashboardRoutes.js
const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/", dashboardController.getAll);
router.post("/", dashboardController.create);
router.patch("/:id", dashboardController.update);
router.delete("/:id", dashboardController.delete);

module.exports = router;
