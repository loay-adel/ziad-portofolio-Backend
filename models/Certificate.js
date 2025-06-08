const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issueDate: { type: Date, required: true },
  issuingOrganization: { type: String, required: true },
  description: { type: String },
  verificationLink: { type: String },
  image: { type: String, required: true },
  hours: { type: String },
  loaction: { type: String },
});

module.exports = mongoose.model(
  "Certificate",
  certificateSchema,
  "certificates"
);
