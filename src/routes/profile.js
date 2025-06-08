const express = require("express");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);

    //check token
  } catch (err) {
    console.error("error getting profile ", err);
  }
});

module.exports = profileRouter;
