const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brief: String,
  description: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  image: { type: String, required: true },
});
module.exports = mongoose.model("Book", bookSchema, "books");
