const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditData } = require("../utils/validator");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.send(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditData(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/editPassword", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const passwordInputByUser = req.body.password;

    const isPasswordSame = await bcrypt.compare(
      passwordInputByUser,
      user.password
    );

    if (isPasswordSame) {
      return res.status(400).send("Password can't be same");
    }

    const passwordInputByUserHash = await bcrypt.hash(passwordInputByUser, 10);

    user.password = passwordInputByUserHash;
    await user.save();
    res.send("Password changed successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = profileRouter;
