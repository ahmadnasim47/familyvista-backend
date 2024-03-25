const mongoose = require('mongoose');

const familyMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  birthdate: Date,
  gender: {
    type: String,
    enum: ['Male', 'Female']
  },
  parent: {
    cnic: {
      type: String,
      ref: 'FamilyMember'
    }
  },
  children: [{
    cnic: {
      type: String,
      ref: 'FamilyMember'
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  cnic: {
    type: String,
    required: true,
    unique: true
  },
  photo: {
    type: String
  }
});

const FamilyMember = mongoose.model('FamilyMember', familyMemberSchema)

module.exports = FamilyMember;
