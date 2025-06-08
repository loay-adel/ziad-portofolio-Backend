// routes/bookRoutes.js
const express = require("express");
const router = express.Router();
const bookController = require("../controllers/BookController");

router.get("/", bookController.getAll);
router.post("/", bookController.create);
router.patch("/:id", bookController.update);
router.delete("/:id", bookController.delete);

module.exports = router;
