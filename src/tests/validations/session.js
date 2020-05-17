const Joi = require('@hapi/joi');

module.exports = {
  cookies: {
    sessionId: Joi.string().uuid().required(),
  },
};
