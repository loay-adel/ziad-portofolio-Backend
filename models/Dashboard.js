const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: [{ type: String, required: true }],
  year: { type: Number, required: true },
  tools: [{ type: String, required: true }],
  image: { type: String, required: true },
});

module.exports = mongoose.model("Dashboard", dashboardSchema, "dashboard");
