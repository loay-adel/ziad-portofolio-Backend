require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cors = require("cors");
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
const PORT = process.env.PORT || 5000;

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware - FIXED: Increased payload limits
app.use(cors());
app.use(express.json({ limit: "250mb" })); 
app.use(express.urlencoded({ extended: true, limit: "250mb" })); 

// Static files
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));

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

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Handle payload too large errors specifically
  if (err instanceof SyntaxError && err.status === 413 && "body" in err) {
    return res
      .status(413)
      .json({ error: "Payload too large. Maximum 50MB allowed." });
  }

  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
