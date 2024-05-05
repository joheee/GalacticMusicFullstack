const { Shirt } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getShirts() {
  return Shirt.find({});
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getShirtById(id) {
  return Shirt.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} size - size
 * @param {string} price - price
 * @returns {Promise}
 */
async function createShirt(name, size, price) {
  return User.create({
    name,
    size,
    price,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} size - size
 * @param {string} price - price
 * @returns {Promise}
 */
async function updateShirt(id, name, size, price) {
  return Shirt.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        size,
        price,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteShirt(id) {
  return Shirt.deleteOne({ _id: id });
}

module.exports = {
  getShirts,
  getShirtById,
  createShirt,
  deleteShirt,
  updateShirt
};
