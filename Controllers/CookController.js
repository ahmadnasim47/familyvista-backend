
const Story = require('../models/CookiSchema');

// Controller function to create a new story
const createrecipe = async (req, res) => {
  try {
    const { title, text } = req.body;
    const newStory = new Story({ title, text });
    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller function to get all stories
const getAllRecipes = async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get a specific story by ID
const getReciepyById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to update a story by ID
const updateReciepy = async (req, res) => {
  try {
    const { title, text } = req.body;
    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id,
      { title, text },
      { new: true }
    );
    if (!updatedStory) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(updatedStory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller function to delete a story by ID
const deleteReciepy = async (req, res) => {
  try {
    const deletedStory = await Story.findByIdAndDelete(req.params.id);
    if (!deletedStory) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json({ message: 'Story deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    createrecipe,
  getAllRecipes,
  getReciepyById,
  updateReciepy,
  deleteReciepy
};
