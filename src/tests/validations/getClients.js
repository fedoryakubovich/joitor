const Joi = require('joi');

module.exports = {
  query: {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
  },
};
