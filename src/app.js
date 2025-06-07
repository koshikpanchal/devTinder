const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validator");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //fetching the user
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid credentials");
    }

    const isPasswordValid = user.validatePassword(password);
    if (isPasswordValid) {
      // create JWT token:
      const token = user.getJWT();

      // Add token to the cookie
      res.cookie("token", token);

      res.send("Login Successfull");
    } else {
      throw new Error("invalid credentials");
    }
  } catch (err) {
    console.error("Failed to login", err);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);

    //check token
  } catch (err) {
    console.error("error getting profile ", err);
  }
});

// first connect to the DB
connectDB()
  .then(() => {
    console.log("Databse is connected succesfully");
    // then connect to the server
    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Databse is not connected", err);
  });
