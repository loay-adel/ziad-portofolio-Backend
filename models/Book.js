const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  livepreview: { type: String, required: true },
  downloadLink: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Book", bookSchema, "books");
