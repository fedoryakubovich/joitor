const Joi = require('@hapi/joi');
const isEmpty = require('lodash.isempty');

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

module.exports = validate;
