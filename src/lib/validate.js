const objectIsEmpty = require('./objectIsEmpty');

const validate = (data, schema) => {
  if (objectIsEmpty(data) || objectIsEmpty(schema)) return;

  const { error: errors } = Joi.object(schema).validate(data, { abortEarly: false });

  if (objectIsEmpty(errors) || errors.details.length === 0) return;

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
