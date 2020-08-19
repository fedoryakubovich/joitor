const Joi = require('joi');

module.exports = {
  params: {
    userId: Joi.string().uuid().required(),
    bookId: Joi.string().uuid().required(),
  },
};
