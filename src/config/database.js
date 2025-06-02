const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NamasteDev:24xDJnwzsTq5IZbP@namastenode.eskja.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };
