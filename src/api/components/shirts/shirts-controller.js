const shirtService = require('./shirts-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Handle get list of users request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getShirts(request, response, next) {
  try {
    const shirts = await shirtService.getShirts();
    return response.status(200).json(shirts);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get user detail request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getShirtById(request, response, next) {
  try {
    const shirt = await shirtService.getShirtById(request.params.id);

    if (!shirt) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown shirt');
    }

    return response.status(200).json(shirt);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createShirt(request, response, next) {
  try {
    const name = request.body.name;
    const size = request.body.size;
    const price = request.body.price;

    const success = await shirtService.createShirt(name, size, price);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create shirt'
      );
    }

    return response.status(200).json({ name, size, price });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateShirt(request, response, next) {
  try {
    const id = request.params.id;
    const name = request.body.name;
    const size = request.body.size;
    const price = request.body.price;

    const success = await shirtService.updateShirt(id, name, size, price);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update shirt'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete user request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteShirt(request, response, next) {
  try {
    const id = request.params.id;

    const success = await shirtService.deleteShirt(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete shirt'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}
module.exports = {
  getShirts,
  getShirtById,
  createShirt,
  updateShirt,
  deleteShirt
};
