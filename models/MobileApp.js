const mongoose = require("mongoose");

const mobileAppSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: Number, required: true },
  role: { type: String, required: true },
  downloadlink: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("MobileApp", mobileAppSchema, "apps");
