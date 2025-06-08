// controllers/researchPaperController.js
const ResearchPaper = require("../models/ResearchPaper");

exports.getAll = async (req, res) => {
  try {
    const papers = await ResearchPaper.find().sort({ order: 1 });
    res.json(papers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  const paper = new ResearchPaper(req.body);
  try {
    const newPaper = await paper.save();
    res.status(201).json(newPaper);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedPaper = await ResearchPaper.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPaper);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await ResearchPaper.findByIdAndDelete(req.params.id);
    res.json({ message: "Research paper deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
