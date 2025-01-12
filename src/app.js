const express = require("express");

const app = express();

app.use("/koshik", (req, res) => {
  res.send("Page is Koshik");
});

app.use("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
