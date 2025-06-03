const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

// handeling the request and convert into JSON
app.use(express.json());

// adding data to the user or sign up for the new user
app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    console.error("error saving user", err);
  }
});

// getting the data of the user from the user's email Id
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    console.error("error saving user", err);
  }
});

//delete the user from the _id
app.delete("/user", async (req, res) => {
  const userEmailId = req.body.emailId;
  try {
    await User.findOneAndDelete({ emailId: userEmailId });
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// getting all the data of users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    console.error("error saving user", err);
  }
});

// updating the data of particular user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_FIELDS = ["age", "about", "password", "photoUrl", "skills"];
    const isAllowedToUpdate = Object.keys(data).every((k) =>
      k.includes(ALLOWED_FIELDS)
    );

    if (!isAllowedToUpdate) {
      throw new Error("Not allowed to update");
    }
    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("User's data update successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
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
