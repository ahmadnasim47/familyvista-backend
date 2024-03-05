const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const rootMemberSchema = new mongoose.Schema({
    id: String,
    cnic:{type: String, required: true},
    // Change id type to String
    name: String,
    dob: String,
    children: {type: [String], required: true},
     // Storing child IDs as strings
     createdAt: {
        type: Date,
        default: Date.now() // Set default value to current date/time
      }
    });

rootMemberSchema.pre('save', function(next) {
    if (!this.id) {
        this.id = uuidv4(); // Generate UUID if id is not provided
    }
    next();
});

const RootMember = mongoose.model('root member', rootMemberSchema);

module.exports = RootMember;
