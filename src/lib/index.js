const objectIsEmpty = require('./objectIsEmpty');

const validation = (schema) => {
  if (objectIsEmpty(schema)) throw new Error('Please provide a validation schema');

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

    if (objectIsEmpty(errors)) {
      return next();
    }

    return res.status(400).json({ status: 400, statusText: 'Bad Request', errors });
  };
};

module.exports = validation;
