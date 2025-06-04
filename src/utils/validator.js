const validator = require("validator");

function validateSignUpData(request) {
  const { firstName, lastName, emailId } = request.body;
  if (firstName.length > 50 || firstName.length < 4) {
    throw new Error("First name not valid");
  } else if (lastName.length > 50 || lastName.length < 4) {
    throw new Error("Last name not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("email id is not valid");
  }
}

module.exports = {
  validateSignUpData,
};
