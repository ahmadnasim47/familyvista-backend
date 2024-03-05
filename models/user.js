require("dotenv").config()
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  gender: String,
  cnic: {type: String, required: true},
  memberID: {type: String, default: ""},
  isRootMember: {type: Boolean, required: true},
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now() // Set default value to the current date/time
  }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});


userSchema.methods.getJWTToken = function () {
  console.log("jwt secret: ", process.env.JWT_SECRET)
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};



const User = mongoose.model("User", userSchema);
module.exports = User
