const mongoose = require('mongoose');

const familyTraditionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now // Sets the default value to the current timestamp when a document is created
  }
});

const FamilyTradition = mongoose.model('FamilyTradition', familyTraditionSchema);

module.exports = FamilyTradition;
