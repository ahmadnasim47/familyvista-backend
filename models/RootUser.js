const mongoose = require('mongoose');

const rootUserSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  // Other root user details
  photo: {
    type: String
  },
  cnic: {
    type: String,
    required: true,
    unique: true
  },
  children: [{
    cnic: {
      type: String,
      ref: 'FamilyMember'
    }
  }]
});

const RootUser = mongoose.model('RootUser', rootUserSchema)

module.exports = RootUser;
