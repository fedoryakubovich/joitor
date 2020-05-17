const Joi = require('@hapi/joi');

module.exports = {
  body: {
    allowUnknown: false,
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(256).required(),
  },
};
