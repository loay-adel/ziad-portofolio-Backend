const mongoose = require("mongoose");

const researchPaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Coming Soon", "Published"],
    default: "Coming Soon",
  },
  year: { type: Number, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("ResearchPaper", researchPaperSchema, "papers");
