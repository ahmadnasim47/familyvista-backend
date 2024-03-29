const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const memberSchema = new mongoose.Schema({
    id: String,
    parentCNIC:{type: String, required: true},
    cnic:String,
    // Change id type to String
    name: String,
    dob: String,
    children: {type: [String], required: true},
     // Storing child IDs as strings
     createdAt: {
        type: Date,
        default: Date.now // Set default value to current date/time
      }
    });

memberSchema.pre('save', function(next) {
    if (!this.id) {
        this.id = uuidv4(); // Generate UUID if id is not provided
    }
    next();
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
