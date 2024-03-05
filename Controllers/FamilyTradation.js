const FamilyTradition = require('../models/FamilyTradations');

const familyTraditionController = {
  createTradition: async (req, res) => {
    try {
      const { title, description } = req.body;
      const newTradition = new FamilyTradition({ title, description });
      const savedTradition = await newTradition.save();
      res.status(201).json(savedTradition);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  getAllTraditions: async (req, res) => {
    try {
      const traditions = await FamilyTradition.find();
      res.json(traditions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getTraditionById: async (req, res) => {
    try {
      const tradition = await FamilyTradition.findById(req.params.id);
      if (!tradition) {
        return res.status(404).json({ message: 'Tradition not found' });
      }
      res.json(tradition);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateTradition: async (req, res) => {
    try {
      const { title, description } = req.body;
      const updatedTradition = await FamilyTradition.findByIdAndUpdate(
        req.params.id,
        { title, description },
        { new: true }
      );
      if (!updatedTradition) {
        return res.status(404).json({ message: 'Tradition not found' });
      }
      res.json(updatedTradition);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  deleteTradition: async (req, res) => {
    try {
      const deletedTradition = await FamilyTradition.findByIdAndDelete(req.params.id);
      if (!deletedTradition) {
        return res.status(404).json({ message: 'Tradition not found' });
      }
      res.json({ message: 'Tradition deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = familyTraditionController;
