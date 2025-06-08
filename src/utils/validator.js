const validator = require("validator");

function validateSignUpData(req) {
  const { firstName, lastName, emailId } = req.body;
  if (firstName.length > 50 || firstName.length < 4) {
    throw new Error("First name not valid");
  } else if (lastName.length > 50 || lastName.length < 4) {
    throw new Error("Last name not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email id is not valid");
  }
}

function validateEditData(req) {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "gender",
    "about",
    "age",
    "skills",
  ];

  return Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
}

module.exports = {
  validateSignUpData,
  validateEditData,
};
