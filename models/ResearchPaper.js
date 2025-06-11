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
  links: [
    {
      label: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  year: { type: Number, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("ResearchPaper", researchPaperSchema, "papers");
