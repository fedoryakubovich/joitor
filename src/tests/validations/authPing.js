const Joi = require('@hapi/joi');

module.exports = {
  headers: {
    authorization: Joi.string().required(),
  },
};
