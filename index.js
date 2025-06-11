// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const heroRoutes = require("./routes/hero");
// const bookRoutes = require("./routes/books");
// const researchPaperRoutes = require("./routes/researchPapers");
// const courseRoutes = require("./routes/courses");
// const dashboardRoutes = require("./routes/dashboards");
// const certificateRoutes = require("./routes/certificates");
// const mobileAppRoutes = require("./routes/mobileApps");
// const uploadRoutes = require("./routes/upload");
// const authRoutes = require("./routes/auth");

// const app = express();
// const PORT = process.env.PORT || 5000;

// const path = require("path");
// app.use("/images", express.static(path.join(__dirname, "images")));
// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log("Connected to database:", mongoose.connection.db.databaseName);
//   })
//   .catch((err) => console.error("Connection error:", err));
// // Route Registration
// app.use("/api/hero", heroRoutes);
// app.use("/api/books", bookRoutes);
// app.use("/api/research-papers", researchPaperRoutes);
// app.use("/api/courses", courseRoutes);
// app.use("/api/dashboards", dashboardRoutes);
// app.use("/api/certificates", certificateRoutes);
// app.use("/api/mobile-apps", mobileAppRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/upload", uploadRoutes);
// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: "Internal server error" });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // Graceful shutdown
// process.on("SIGINT", () => {
//   mongoose.connection.close(() => {
//     console.log("MongoDB disconnected through app termination");
//     process.exit(0);
//   });
// });
