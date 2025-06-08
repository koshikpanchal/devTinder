const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
