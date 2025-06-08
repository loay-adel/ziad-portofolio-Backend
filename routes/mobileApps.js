// routes/mobileAppRoutes.js
const express = require("express");
const router = express.Router();
const mobileAppController = require("../controllers/mobileAppController");

router.get("/", mobileAppController.getAll);
router.post("/", mobileAppController.create);
router.patch("/:id", mobileAppController.update);
router.delete("/:id", mobileAppController.delete);

module.exports = router;
