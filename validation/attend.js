const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateAttendInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Champs nom requis";
  }
// Firstname checks
if (Validator.isEmpty(data.firstname)) {
  errors.firstname = "Champs prénom requis";
}
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Champs email requis";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email invalide";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};
