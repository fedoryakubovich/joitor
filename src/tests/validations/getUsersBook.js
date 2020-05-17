const Joi = require('@hapi/joi');

module.exports = {
  params: {
    userId: Joi.string().uuid().required(),
    bookId: Joi.string().uuid().required(),
  },
};
