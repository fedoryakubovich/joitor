const isEmpty = require('lodash.isempty');

const validate = require('./validate');
const JoitorError = require('./error');

const validation = (schema, options = {}) => {
  if (isEmpty(schema)) throw new Error('Please provide a validation schema');

  return (req, res, next) => {
    const errors = {};

    ['headers', 'body', 'query', 'params', 'cookies'].forEach((key) => {
      if (schema[key]) {
        const error = validate(req[key], schema[key]);

        if (error) {
          errors[key] = error;
        }
      }
    });

    return isEmpty(errors) ? next() : next(new JoitorError(errors, options));
  };
};

exports.JoitorError = JoitorError;
module.exports = validation;
