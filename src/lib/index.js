const Joi = require('@hapi/joi');
const isEmpty = require('lodash.isempty');

class JoitorError extends Error {

  constructor(errors, options) {
    super();

    this.name = this.constructor.name;
    this.errors = errors;
    this.status = options.status || 400;
    this.statusText = options.statusText || 'Bad Request';
  }
}

JoitorError.prototype.toJSON = function () {
  return {
    status: this.status,
    statusText: this.statusText,
    errors: this.errors,
  };
};

const validate = (data, schema) => {
  const { allowUnknown } = schema;
  delete schema.allowUnknown;
  const { error: errors } = Joi.object(schema).validate(data, {
    abortEarly: false,
    allowUnknown: allowUnknown || true,
  });

  if (isEmpty(errors) || errors.details.length === 0) return;

  return errors.details.reduce((errorsList, error) => {
    const {
      path: [field],
      message,
    } = error;

    errorsList[field] = message;

    return errorsList;
  }, {});
};

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

exports = module.exports = validation;
exports.JoitorError = JoitorError;
