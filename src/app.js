const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Akshay",
    lastName: "Saini",
    emailId: "akshay@asini.com",
    password: "as@123",
  });

  try {
    await user.save();

    res.send("User added successfully");
  } catch (err) {
    console.error("error saving user", err);
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
    console.error("Databse is connected succesfully", err);
  });
