require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const heroRoutes = require("./routes/hero");
const bookRoutes = require("./routes/books");
const researchPaperRoutes = require("./routes/researchPapers");
const courseRoutes = require("./routes/courses");
const dashboardRoutes = require("./routes/dashboards");
const certificateRoutes = require("./routes/certificates");
const mobileAppRoutes = require("./routes/mobileApps");
const uploadRoutes = require("./routes/upload");
const authRoutes = require("./routes/auth");
const PORT = process.env.PORT || 5000;

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/images", express.static(path.join(__dirname, "images")));

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

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
