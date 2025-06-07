const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("token is not valid");
    }

    const decodedObj = await jwt.decode(token, "DEV@Tinder790");
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Error getting user");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error: ", err.message);
  }
};

module.exports = {
  userAuth,
};
