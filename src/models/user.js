const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      validate(gen) {
        if (!["male", "female", "other"].includes(gen)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photoUrl: { type: String },
    about: { type: String, default: "This is a random value" },
    skills: { type: [String] },
  },
  { timestamp: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
