const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  duration: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Course", courseSchema, "course");
