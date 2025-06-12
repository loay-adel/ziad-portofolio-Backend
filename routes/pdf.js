const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// Ensure the PDFs directory exists
const pdfDir = path.join(__dirname, "../pdfs");
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pdfDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `pdf-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File filter (PDFs only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf/;
  const isValidExt = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const isValidMime = allowedTypes.test(file.mimetype);

  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

// Multer middleware
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 220 * 1024 * 1024 }, // 120MB
});

// Upload route
// In your upload route
router.post("/", upload.single("pdf"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Use absolute URL for production
    const fileUrl = `${req.protocol}://${req.get("host")}/pdfs/${
      req.file.filename
    }`;

    res.status(201).json({ fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});
router.get("/exists/:filename", (req, res) => {
  const filePath = path.join(pdfDir, req.params.filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ exists: false });
    }
    res.json({ exists: true });
  });
});
module.exports = router;
