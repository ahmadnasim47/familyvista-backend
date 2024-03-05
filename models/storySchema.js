// Import Mongoose
const mongoose = require('mongoose');

// Create a Mongoose schema for the story
const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a Mongoose model based on the schema
const Story = mongoose.model('Story', storySchema);

module.exports = Story;
