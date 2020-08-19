const Joi = require('joi');

module.exports = {
  body: {
    email: Joi.string().email().required(),
  },
  params: {
    userId: Joi.string().uuid().required(),
  },
};
