const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  // console.log('validateRegisterInput: ', data);
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';
  data.to = !isEmpty(data.to) ? data.to : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required';
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  if (!Validator.isDate(data.from)) {
    errors.from = 'From date field not correctly formatted';
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  if (!data.current) {
    if (!Validator.isDate(data.to)) {
      errors.from = 'To date field not correctly formatted';
    }
    if (Validator.isEmpty(data.to)) {
      errors.from = 'To date field is required';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
