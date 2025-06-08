// controllers/dashboardController.js
const Dashboard = require("../models/Dashboard");

exports.getAll = async (req, res) => {
  try {
    const dashboards = await Dashboard.find().sort({ order: 1 });
    res.json(dashboards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  const dashboard = new Dashboard(req.body);
  try {
    const newDashboard = await dashboard.save();
    res.status(201).json(newDashboard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedDashboard = await Dashboard.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDashboard);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Dashboard.findByIdAndDelete(req.params.id);
    res.json({ message: "Dashboard deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
