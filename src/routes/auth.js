const express = require("express");
const { validateSignUpData } = require("../utils/validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //validate signup data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    console.error("error saving user", err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //fetching the user
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // create JWT token:
      const token = await user.getJWT();

      // Add token to the cookie
      res.cookie("token", token);

      res.json({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          about: user.about,
          skills: user.skills,
          age: user.age,
          photoUrl: user.photoUrl,
          gender: user.gender,
          emailId: user.emailId,
        },
      });
    } else {
      throw new Error("invalid credentials");
    }
  } catch (err) {
    res.status(404).send("invalid credentials");
  }
});

authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .send("Logout successfull");
});

module.exports = authRouter;
