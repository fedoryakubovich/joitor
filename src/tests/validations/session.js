const Joi = require('joi');

module.exports = {
  cookies: {
    sessionId: Joi.string().uuid().required(),
  },
};
