require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  "http://localhost:5173",
  "https://api.ziadabdullah.com",
  "https://ziadabdullah.com",
  "https://www.ziadabdullah.com",
];

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    console.warn(`[CORS] blocked: ${origin}`);
    cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 200,
  maxAge: 86400,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));

app.use("/api/hero", require("./routes/hero"));
app.use("/api/books", require("./routes/books"));
app.use("/api/research-papers", require("./routes/researchPapers"));
app.use("/api/courses", require("./routes/courses"));
app.use("/api/dashboards", require("./routes/dashboards"));
app.use("/api/certificates", require("./routes/certificates"));
app.use("/api/mobile-apps", require("./routes/mobileApps"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/pdf", require("./routes/pdf"));
app.use("/api/about", require("./routes/about"));

app.get("/health", (req, res) => {
  const pdfDir = path.join(__dirname, "pdfs");
  const pdfs = fs.existsSync(pdfDir)
    ? fs.readdirSync(pdfDir).filter((f) => f.endsWith(".pdf"))
    : [];
  res.json({
    status: "ok",
    mongo: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    pdfs: pdfs.length,
    origins: allowedOrigins,
  });
});

app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS")
    return res.status(403).json({ error: "CORS policy", allowedOrigins });

  if (err.status === 413)
    return res.status(413).json({ error: "Payload too large (max 100 MB)" });

  console.error(`[${new Date().toISOString()}] ${req.method} ${req.url}`, err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
