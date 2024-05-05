const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const shirtControllers = require('./shirts-controller');
const shirtValidators = require('./shirts-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/shirts', route);

  // Get list of users
  route.get('/', shirtControllers.getShirts);

  // Create user
  route.post(
    '/',
    // authenticationMiddleware,
    celebrate(shirtValidators.createShirt),
    shirtControllers.createShirt
  );

  // Get user detail
  route.get('/:id', authenticationMiddleware, shirtControllers.getShirtById);

  // Update user
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(shirtValidators.updateShirt),
    shirtControllers.updateShirt
  );

  // Delete user
  route.delete('/:id', authenticationMiddleware, shirtControllers.deleteShirt);

};
