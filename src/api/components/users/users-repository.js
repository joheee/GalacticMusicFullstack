const { User } = require('../../../models');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  return User.find({});
}

/**
 * Get a list of users with pagination, sorting, and search
 * @param {number} pageSize - Number of users per page
 * @param {number} skip - Number of users to skip
 * @param {string} sortBy - Field to sort by
 * @param {string} sortOrder - Sorting order ('asc' or 'desc')
 * @param {string} searchQuery - Search query
 * @returns {Promise}
 */
async function getUsersWithPaginationAndSorting(pageSize, skip, sortBy, sortOrder, searchQuery) {
  const sortCriteria = {};
  sortCriteria[sortBy] = sortOrder === 'desc' ? -1 : 1;

  const searchCriteria = searchQuery ? { email: new RegExp(searchQuery, 'i') } : {};

  return User.find(searchCriteria).sort(sortCriteria).limit(pageSize).skip(skip);
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
*/
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
  getUsersWithPaginationAndSorting,
};
