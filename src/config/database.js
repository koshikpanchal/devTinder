const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://NamasteDev:ps4CK1oO3Rk2i7oL@namastenode.eskja.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };
