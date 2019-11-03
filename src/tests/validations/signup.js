const Joi = require('@hapi/joi');

module.exports = {
  body: {
    email: Joi.string()
      .email()
      .required(),

    password: Joi.string()
      .min(6)
      .max(256)
      .required(),
  },
};
