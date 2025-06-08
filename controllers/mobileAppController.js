// controllers/mobileAppController.js
const MobileApp = require("../models/MobileApp");

exports.getAll = async (req, res) => {
  try {
    const apps = await MobileApp.find().sort({ order: 1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  const app = new MobileApp(req.body);
  try {
    const newApp = await app.save();
    res.status(201).json(newApp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedApp = await MobileApp.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedApp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await MobileApp.findByIdAndDelete(req.params.id);
    res.json({ message: "Mobile app deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
