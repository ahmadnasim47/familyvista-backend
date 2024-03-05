// Import Mongoose
const mongoose = require('mongoose');

// Create a Mongoose schema for the story
const CookiSchema = new mongoose.Schema({
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
const Cook = mongoose.model('Cook', CookiSchema);

module.exports = Cook;
