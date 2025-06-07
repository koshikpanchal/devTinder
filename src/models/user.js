const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    emailId: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("not a valid email");
      },
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

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder790", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  return await bcrypt.compare(passwordInputByUser, passwordHash);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
