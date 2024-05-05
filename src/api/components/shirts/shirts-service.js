const shirtsRepository = require('./shirts-repository');

/**
 * Get list of users
 * @returns {Array}
 */
async function getShirts() {
  const shirts = await shirtsRepository.getShirts();

  const results = [];
  for (let i = 0; i < shirts.length; i += 1) {
    const shirt = shirts[i];
    results.push({
      id: shirt.id,
      name: shirt.name,
      size: shirt.size,
      price: shirt.price,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getShirtById(id) {
  const shirt = await shirtsRepository.getShirtById(id);

  // Shirt not found
  if (!shirt) {
    return null;
  }

  return {
    id: shirt.id,
    name: shirt.name,
    size: shirt.size,
    price: shirt.price,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createShirt(name, size, price) {
  try {
    await shirtsRepository.createShirt(name, size, price);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateShirt(id, name, size, price) {
  const shirt = await shirtsRepository.getShirtById(id);

  // User not found
  if (!shirt) {
    return null;
  }

  try {
    await shirtsRepository.updateShirt(id, name, size, price);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteShirt(id) {
  const shirt = await shirtsRepository.getShirtById(id);

  // User not found
  if (!shirt) {
    return null;
  }

  try {
    await shirtsRepository.deleteShirt(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getShirts,
  getShirtById,
  createShirt,
  deleteShirt,
  updateShirt,
};
