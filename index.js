const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const treeRoutes = require('./Routes/treeRoutes');
const app = express();
const port = process.env.PORT || 9000;

const User = require("./models/user");

app.use(cors());
app.use(express.json());

require("./DB/conn");

app.use('/api/tree', treeRoutes);



app.post("/register", async (req, res) => {
  const { name, email, password, gender } = req.body;

  const user = new User({
    name,
    email,
    password,
    gender,
  });

  try {
    await user.save();
    console.log("User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("User registration failed:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    console.log("User logged in successfully");
    res.status(200).json({ message: "Login successful" });
  } else {
    console.log("Login failed: Incorrect password");
    res.status(401).json({ message: "Login failed: Incorrect password" });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
