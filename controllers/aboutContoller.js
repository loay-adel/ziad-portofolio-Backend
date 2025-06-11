// controllers/aboutController.js
const About = require("../models/about");

exports.getAll = async (req, res) => {
  try {
    const data = await About.findOne(); // changed variable name
    res.json(data || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  const newAbout = new About(req.body);
  try {
    const savedAbout = await newAbout.save();
    res.status(201).json(savedAbout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedAbout = await About.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAbout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await About.findByIdAndDelete(req.params.id);
    res.json({ message: "About information deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
