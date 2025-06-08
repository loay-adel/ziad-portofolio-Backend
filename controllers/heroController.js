// controllers/heroController.js
const Hero = require("../models/Hero");

exports.getAll = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  const hero = new Hero(req.body);
  try {
    const savedHero = await hero.save();
    res.status(201).json(savedHero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedHero = await Hero.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedHero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Hero.findByIdAndDelete(req.params.id);
    res.json({ message: "Hero information deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
