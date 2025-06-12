const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profession: { type: String, required: true },
  expertise: { type: String, required: true },
});

module.exports = mongoose.model("Hero", heroSchema, "hero");
