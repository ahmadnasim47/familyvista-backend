const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email:{
    type:String,
    required:true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female']
  },
  password: {
    type: String,
    required: true
  },
  Cnic:{
    type:String,
    required:true,
    unique:true
  },
  photo: {
    type: String // Assuming photo is stored as a URL or file path
  },

  // Other user details such as name, email, etc.
});

const User = mongoose.model('User', userSchema)

module.exports = User;
