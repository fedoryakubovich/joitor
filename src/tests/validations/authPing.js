const Joi = require('joi');

module.exports = {
  headers: {
    authorization: Joi.string().required(),
  },
};
