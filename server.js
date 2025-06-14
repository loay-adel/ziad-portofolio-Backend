require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const fs = require("fs"); // Added for health check
const heroRoutes = require("./routes/hero");
const bookRoutes = require("./routes/books");
const researchPaperRoutes = require("./routes/researchPapers");
const courseRoutes = require("./routes/courses");
const dashboardRoutes = require("./routes/dashboards");
const certificateRoutes = require("./routes/certificates");
const mobileAppRoutes = require("./routes/mobileApps");
const uploadRoutes = require("./routes/upload");
const pdfRoutes = require("./routes/pdf");
const authRoutes = require("./routes/auth");
const aboutRoutes = require("./routes/about");

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.CLIENT_ORIGIN,
      "http://localhost:5173",
      "https://ziadabdullah.com",
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS middleware first
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Enable preflight for all routes

// Increase payload limits
app.use(express.json({ limit: "250mb" }));
app.use(express.urlencoded({ extended: true, limit: "250mb" }));

// Static files
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  "/pdfs",
  express.static(path.join(__dirname, "pdfs"), {
    setHeaders: (res) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET");
    },
  })
);

// Routes
app.use("/api/hero", heroRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/research-papers", researchPaperRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/dashboards", dashboardRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/mobile-apps", mobileAppRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/about", aboutRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  const pdfDir = path.join(__dirname, "pdfs");
  // Check if pdfDir exists
  if (fs.existsSync(pdfDir)) {
    res.json({
      status: "ok",
      pdfDirectory: pdfDir,
      files: fs.readdirSync(pdfDir).filter((f) => f.endsWith(".pdf")),
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "PDF directory not found",
    });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Add CORS headers to error responses
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS policy violation" });
  }
  if (err.status === 413 || (err instanceof SyntaxError && "body" in err)) {
    return res
      .status(413)
      .json({ error: "Payload too large. Maximum 250MB allowed." });
  }
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
