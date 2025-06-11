const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  description: { type: String, required: true },
  email: { type: String, required: true },
  linkedin: { type: String, required: true },
  whatsapp: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model("About", aboutSchema, "about");
