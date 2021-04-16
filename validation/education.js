const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  // console.log('validateRegisterInput: ', data);
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.major = !isEmpty(data.major) ? data.major : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  // data.to = !isEmpty(data.to) ? data.to : '';

  if (Validator.isEmpty(data.school)) {
    errors.school = 'Job school field is required';
  }
  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }
  if (Validator.isEmpty(data.major)) {
    errors.major = 'Major field is required';
  }

  if (!Validator.isDate(data.from)) {
    errors.from = 'From date field not correctly formatted';
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
