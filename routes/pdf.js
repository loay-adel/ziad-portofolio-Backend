const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// Setup PDF directory
const pdfDir = path.join(__dirname, "../pdfs");
fs.existsSync(pdfDir) || fs.mkdirSync(pdfDir, { recursive: true });

// Configure upload
const upload = multer({
  storage: multer.diskStorage({
    destination: pdfDir,
    filename: (_, file, cb) =>
      cb(
        null,
        `pdf-${Date.now()}-${Math.random().toString(36).slice(2)}${path.extname(
          file.originalname
        )}`
      ),
  }),
  fileFilter: (_, file, cb) =>
    /\.pdf$/i.test(file.originalname) && file.mimetype === "application/pdf"
      ? cb(null, true)
      : cb(new Error("Only PDF files allowed")),
  limits: { fileSize: 250 * 1024 * 1024 }, // 250MB
});

// Upload route
router.post("/", upload.single("pdf"), (req, res) =>
  req.file
    ? res.status(201).json({
        fileUrl: `${req.protocol}://${req.get("host")}/pdfs/${
          req.file.filename
        }`,
      })
    : res.status(400).json({ error: "No file uploaded" })
);

module.exports = router;
