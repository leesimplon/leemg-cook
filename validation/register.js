const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : "";
  
// Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Nom requis";
  }
// Firstname checks
if (Validator.isEmpty(data.firstname)) {
  errors.firstname = "Prénom requis";
}
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email requis";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email invalide";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Mot de passe requis;
  }
if (Validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = "Mot de passe de confirmation requis";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Mot de passe doit être au mois 6 caractères";
  }
if (!Validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = "Passwords must match";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};
