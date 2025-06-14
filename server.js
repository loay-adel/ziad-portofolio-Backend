require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Enhanced CORS configuration
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  "http://localhost:5173",
  "https://api.ziadabdullah.com/",
  "https://ziadabdullah.com",
  "https://www.ziadabdullah.com",
];

//CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.some((allowed) => {
        return (
          origin === allowed ||
          origin.includes(
            allowed.replace("https://", "").replace("http://", "")
          )
        );
      })
    ) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 86400,
};

// Add preflight handling

// Middleware pipeline
app.use(cors(corsOptions)); // Apply CORS first

// Body parsing for JSON and URL-encoded data
app.use(express.json({ limit: "2500mb" }));
app.use(express.urlencoded({ extended: true, limit: "2500mb" }));

// Static files with CORS headers
const staticHeaders = (res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
};

app.use(
  "/images",
  express.static(path.join(__dirname, "images"), { setHeaders: staticHeaders })
);
app.use(
  "/pdfs",
  express.static(path.join(__dirname, "pdfs"), { setHeaders: staticHeaders })
);

// Routes
app.use("/api/hero", require("./routes/hero"));
app.use("/api/books", require("./routes/books"));
app.use("/api/research-papers", require("./routes/researchPapers"));
app.use("/api/courses", require("./routes/courses"));
app.use("/api/dashboards", require("./routes/dashboards"));
app.use("/api/certificates", require("./routes/certificates"));
app.use("/api/mobile-apps", require("./routes/mobileApps"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/pdf", require("./routes/pdf")); // Assumes multer is configured here
app.use("/api/about", require("./routes/about"));

// Enhanced health check
app.get("/health", (req, res) => {
  try {
    const pdfDir = path.join(__dirname, "pdfs");
    const pdfFiles = fs.existsSync(pdfDir)
      ? fs.readdirSync(pdfDir).filter((f) => f.endsWith(".pdf"))
      : [];

    res.json({
      status: "ok",
      mongo:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      pdfCount: pdfFiles.length,
      allowedOrigins,
    });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// Error handling with CORS headers
app.use((err, req, res, next) => {
  // Ensure CORS headers are set for all error responses
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      error: "CORS policy violation",
      allowedOrigins,
    });
  }

  if (err.status === 413) {
    return res.status(413).json({
      error: "Payload too large",
      maxSize: "250MB",
    });
  }

  console.error(`[${new Date().toISOString()}] ${req.method} ${req.url}`, err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
});
