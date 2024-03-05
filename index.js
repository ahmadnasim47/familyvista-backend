const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const sendToken = require("./utils/jwtToken");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const stories=require('./Routes/storiesRoutes')
const cooking=require('./Routes/CookRoutes')
const tradition=require('./Routes/FamilyTradation')


const multer = require('multer');
// const app = express();
const upload = multer({ dest: 'uploads/' }); 



const treeRoutes = require('./Routes/treeRoutes');
const app = express();
const port = process.env.PORT || 9000;

const User = require("./models/user");
const RootMember = require("./models/rootmember");
// const { getAllStories } = require("./Controllers/StoriesController");

app.use(cors());
app.use(express.json());

require("./DB/conn");

app.use('/api/tree', treeRoutes);
app.use('/stories', stories);
app.use('/cooking', cooking);
app.use('/family',tradition)



const secretKey = 'I-AM-Arbaz';





// app.post("/register", async (req, res) => {
//   const { name, email, password, gender } = req.body;

//   try {
//     // Check if the email already exists in the database
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // If the email doesn't exist, create a new user
//     const newUser = new User({
//       name,
//       email,
//       password,
//       gender,
//     });

//     await newUser.save();
//     console.log("User registered successfully");
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error("User registration failed:", err);
//     res.status(500).json({ message: "Registration failed" });
//   }
// });










// const express = require('express');
// Specify the upload directory

app.post('/register', upload.single('profileImage'), async (req, res) => {
  const { name, email, password, gender, cnic } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const rootMemberData = await RootMember.findOne({cnic: cnic})
    let isRootMember
    if(rootMemberData) {
      isRootMember = true
    } else {
      isRootMember = false
    }

    // If the email doesn't exist, create a new user
    const newUser = new User({
      name: name,
      cnic: cnic,
      email: email,
      password: password,
      gender: gender,
      isRootMember: isRootMember, 
      avatar: {
        public_id: "this is sample image",
        url: "sampleUrl",
      },
    });

    await newUser.save();
    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully', success: true });
  } catch (err) {
    console.error('User registration failed:', err);
    res.status(500).json({ message: 'Registration failed', success: false });
  }

  // sendToken(user, 201, res);
});

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });










// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   // Find the user by email
//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   // Compare the provided password with the stored hashed password
//   const passwordMatch = await bcrypt.compare(password, user.password);

//   if (passwordMatch) {
//     console.log("User logged in successfully");
//     res.status(200).json({ message: "Login successful" });
//   } else {
//     console.log("Login failed: Incorrect password");
//     res.status(401).json({ message: "Login failed: Incorrect password" });
//   }
// });






app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let user
  try {
    user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = sendToken(user, 200);
      return res.status(200).json({ message: "Logged in", token: token, userId: user._id})
    } else {
      return res.status(401).json({ message: 'Login failed: Incorrect password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

});

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }
//     // console.log(user)
//     req.user= user;
//     next();
//   });
// };


app.post("/logout",(req,res,next)=>{
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
