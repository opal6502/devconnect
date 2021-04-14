const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  // console.log('validateRegisterInput: ', data);
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Not a valid email address';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
