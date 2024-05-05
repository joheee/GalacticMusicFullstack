const joi = require('joi');

module.exports = {
  createShirt: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      size: joi.string().min(1).max(100).required().label('Name'),
      price: joi.string().min(1).max(100).required().label('Name'),
    },
  },

  updateShirt: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      size: joi.string().min(1).max(100).required().label('Name'),
      price: joi.string().min(1).max(100).required().label('Name'),
    },
  },
};
