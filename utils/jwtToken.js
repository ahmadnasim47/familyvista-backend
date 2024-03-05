// Create Token and saving in cookie
require("dotenv").config()
const sendToken = (user, statusCode, res) => {
  // console.log(User.getJWTToken());
  // User.getJWTToken();

    const token = user.getJWTToken();
    console.log(token);
  
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    return token
  };
  
  module.exports = sendToken;
  