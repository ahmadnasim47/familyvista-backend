const User = require("../models/user");

const jwt = require("jsonwebtoken");


exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.body;
  console.log(token)

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Please Login to access this resource"
    })
    return next("Please Login to access this resource", 401);
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decodedData)

  req.user = await User.findById(decodedData.id);
  console.log(req.user)
  next();
};


exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        message: `Role: ${req.user.role} is not allowed to access this resouce `
      })

    }

    next();
  };
};